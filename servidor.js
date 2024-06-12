const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const dotenv = require("dotenv");
const { Op } = require('sequelize');
const { multimedia, compra, articulocompra, sequelize, articulo } = require('./models');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const PROTO_PATH = "./proto/multimedia.proto"
const { createCanvas } = require('canvas');
const { Console } = require("console");
const path = require('path');



dotenv.config()

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const multiProto = grpc.loadPackageDefinition(packageDefinition);


const server = new grpc.Server();
server.addService(multiProto.MultimediaService.service, {
    uploadMultimedia: uploadMultimediaImpl,
    generateReport: generateSalesReportImpl

});

server.bindAsync(`localhost:${process.env.GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), () =>{
    console.log(`Servidor GRPC en ejecución en el puerto ${process.env.GRPC_PORT}`)
});

 function uploadMultimediaImpl(call, callback) {
    let itemid, nombreArchivo, chunk;
    let tempFilePath;

    call.on('data', (UploadMultimediaRequest) => {
        if (UploadMultimediaRequest.item) {
            itemid = UploadMultimediaRequest.item;
            console.log("Received item_id:", itemid);
        } else if (UploadMultimediaRequest.nombre) {
            nombreArchivo = UploadMultimediaRequest.nombre;
            tempFilePath = `./uploads/${nombreArchivo}`;
            console.log("Received nombre:", tempFilePath);

        } else if (UploadMultimediaRequest.data) {
            chunk = UploadMultimediaRequest.data;
            fs.appendFileSync(tempFilePath, chunk);
            process.stdout.write('.');
        }
    }).on('end', async () => {
        console.log('\nEnvío de datos terminado.');
        
        try {
            const photo_data = fs.readFileSync(tempFilePath);
            fs.unlinkSync(tempFilePath);

            const newPhoto = await multimedia.create({
                nombre: nombreArchivo,
                contenido: photo_data,
                codigoArticulo: itemid
            });

            callback(null, { response: "Multimedia subida exitosamente" });

        } catch (err) {
            console.error(err);
            callback({ code: grpc.status.INTERNAL, message: "Error al guardar la multimedia" });

        }
                                

    });

    call.on('error', (error) => {
        console.error("Error receiving data:", error);
        callback({ code: grpc.status.INTERNAL, message: "Error al recibir la multimedia" });
    });
}


async function fetchSalesData(startDate, endDate) {
    try {
        const sales = await compra.findAll({
            where: {
                fechacompra: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });
        console.log('Compras recuperadas:', sales);

    const salesData = await Promise.all(sales.map(async (sale) => {
        const items = await articulocompra.findAll({
          where: {
            idCompra: sale.idCompra
          },
          attributes: ['idArticuloCompra', 'cantidadArticulo', 'precioUnitario', 'precioFinal', 'idCompra', 'idTalla'],
          include: [
            {
              model: articulo,
              as: 'articulo'
            }
          ]
        });
  
        // Imprimir datos de cada compra y sus artículos asociados
        console.log('Compra:', sale.dataValues);
        console.log('Artículos de la compra:', items.map(item => item.dataValues));
  
        return { sale: sale.dataValues, items: items.map(item => item.dataValues) };
      }));
  
      // Imprimir los elementos de salesData
      console.log('Datos de ventas:', salesData);
  
      return salesData;
    } catch (error) {
        console.error('Error al recuperar los datos de ventas:', error);
        throw error;
    }
}

function processSalesData(salesData) {
    const salesByDate = {};
    const productsSold = {};

    salesData.forEach(sale => {
        const saleDateDB = new Date(sale.sale.fechaCompra);
        const saleDate = saleDateDB.toDateString();
        if (!salesByDate[saleDate]) {
            salesByDate[saleDate] = 0;
        }
        salesByDate[saleDate] += parseFloat(sale.sale.montoFinal);

        sale.items.forEach(item => {
            const productCode = item.articulo.codigoArticulo; // Assuming 'codigo' is the field for product code
            const productName = item.articulo.nombre;
            const productPrice = item.articulo.precio; // Assuming 'precioUnitario' is the field for product price
            if (!productsSold[productCode]) {
                productsSold[productCode] = { name: productName, quantity: 0, price: productPrice };
            }
            productsSold[productCode].quantity += parseInt(item.cantidadArticulo);
        });
    });

    return { salesByDate, productsSold };
}

function generateBarChart(canvas, data) {
    const ctx = canvas.getContext('2d');
    ctx.dpi = 600;
    const labels = Object.keys(data);
    const values = Object.values(data);

    // Incrementar la resolución del canvas
    canvas.width = 1600;
    canvas.height = 800;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / values.length;
    const maxValue = Math.max(...values);

    ctx.font = '28px Arial';

    values.forEach((value, index) => {
        const barHeight = (value / maxValue) * (canvas.height - 100);
        ctx.fillStyle = 'rgba(75, 192, 192, 1)';
        ctx.fillRect(index * barWidth, canvas.height - barHeight, barWidth - 10, barHeight);
        ctx.fillStyle = 'black';

        ctx.fillText(value.toString(), index * barWidth + barWidth / 2 - 20, canvas.height - barHeight - 10);
        ctx.fillText(labels[index], index * barWidth, canvas.height - 30);
    });

    return canvas.toBuffer('image/png');
}

function generateSalesByDateChart(canvas,salesByDate) {
    const ctx = canvas.getContext('2d');
    ctx.dpi = 600;
    const labels = Object.keys(salesByDate);
    const values = Object.values(salesByDate);

    canvas.width = 1600;
    canvas.height = 800;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / values.length;
    const maxValue = Math.max(...values);

    ctx.font = '28px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    values.forEach((value, index) => {
        const barHeight = (value / maxValue) * (canvas.height - 100);
        ctx.fillStyle = 'rgba(75, 192, 192, 1)';
        ctx.fillRect(index * barWidth, canvas.height - barHeight, barWidth - 10, barHeight);
        ctx.fillStyle = 'black';

        const barCenter = index * barWidth + barWidth / 2;

        ctx.fillText(`$${value.toFixed(2)} MXN`, barCenter, canvas.height - barHeight - 10);
        ctx.fillText(labels[index], barCenter, canvas.height - 50);
    });

    return canvas.toBuffer('image/png');
}

function generateProductsSoldChart(canvas,productsSold) {
    const ctx = canvas.getContext('2d');
    ctx.dpi = 600;
    const labels = Object.keys(productsSold).map(productCode =>`  ${productCode}`);
    const values = Object.values(productsSold).map(product => product.quantity * product.price);

    // Incrementar la resolución del canvas
    canvas.width = 1600;
    canvas.height = 800;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / values.length;
    const maxValue = Math.max(...values);

    ctx.font = '28px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    values.forEach((value, index) => {
        const barHeight = (value / maxValue) * (canvas.height - 100);
        ctx.fillStyle = 'rgba(75, 192, 192, 1)';
        ctx.fillRect(index * barWidth, canvas.height - barHeight, barWidth - 10, barHeight);
        ctx.fillStyle = 'black';

        const barCenter = index * barWidth + barWidth / 2;

        ctx.fillText(`$${value.toFixed(2)} MXN`, barCenter, canvas.height - barHeight - 10);
        ctx.fillText(labels[index], barCenter, canvas.height - 50);
    });

    return canvas.toBuffer('image/png');
}

async function generatePDF(salesByDate, productsSold) {
    const doc = new PDFDocument();
    let buffers = [];
    const pdfPath = path.join(__dirname, 'reporte_ventas.pdf');

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        fs.writeFileSync(pdfPath, pdfData);
        console.log('PDF guardado:', pdfPath);
    });

    doc.fontSize(20).text('Reporte de Compras: Tienda en línea XKBAM', { align: 'center' });
    doc.moveDown();

    doc.fontSize(16).text('Ventas por Fecha:');
    for (const date in salesByDate) {
        doc.fontSize(12).text(`${date}: $${salesByDate[date]}`);
    }

    doc.moveDown();
    doc.fontSize(16).text('Productos Vendidos:');
    doc.moveDown();
    const tableTop = doc.y;
    const itemCodeX = 50;
    const itemNameX = 150;
    const itemQuantityX = 350;
    const itemPriceX = 450;

    doc.fontSize(12).text('Código', itemCodeX, tableTop);
    doc.text('Nombre', itemNameX, tableTop);
    doc.text('Cantidad Vendida', itemQuantityX, tableTop);
    doc.text('Precio Unitario', itemPriceX, tableTop);

    let yPosition = tableTop + 20;

    for (const productCode in productsSold) {
        const product = productsSold[productCode];
        doc.fontSize(10).text(productCode, itemCodeX, yPosition);
        doc.text(product.name, itemNameX, yPosition);
        doc.text(product.quantity, itemQuantityX, yPosition);
        doc.text(`$${product.price.toFixed(2)}`, itemPriceX, yPosition);
        yPosition += 20;
    }

    doc.addPage();
    doc.fontSize(16).text('Gráfica: Ventas por Fecha:');
    const canvas1 = createCanvas(800, 400); 
    const barChart1 = generateSalesByDateChart(canvas1, salesByDate);
    doc.image(barChart1, { fit: [400, 200] });
    


    doc.addPage();
    doc.fontSize(16).text('Gráfica: Ventas por Producto:');
    const canvas2 = createCanvas(800, 400); 
    const barChart2 = generateProductsSoldChart(canvas2, productsSold);
    doc.image(barChart2, { fit: [400, 200] });

    doc.end();

    return new Promise((resolve) => {
        doc.on('end', () => {
            resolve(Buffer.concat(buffers));
        });
    });
}


async function generateSalesReportImpl(call, callback) {
    const { startDate, endDate } = call.request;

    try {
        const salesData = await fetchSalesData(startDate, endDate);
        const { salesByDate, productsSold } = processSalesData(salesData);

        const pdfBuffer = await generatePDF(salesByDate, productsSold);

        // Enviar pdf
        callback(null, { data: pdfBuffer, name: `reporte_ventas_${new Date().toISOString()}.pdf` });
        console.log('PDF enviado');
    } catch (error) {
        console.error('Error al generar el reporte de compras:', error);
        callback({ code: grpc.status.INTERNAL, message: "Error al generar el reporte de compras" });
    }
}
