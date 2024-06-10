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



dotenv.config()

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const multiProto = grpc.loadPackageDefinition(packageDefinition);


const server = new grpc.Server();
server.addService(multiProto.MultimediaService.service, {
    getMultimedia: getMultimediaImpl,
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

async function getMultimediaImpl(call) {
    const { item_id } = call.request;
    try {
        const photos = await Multimedia.findAll({ where: { idarticulo: item_id } });
        if (photos.length === 0) {
            call.emit('error', { code: grpc.status.NOT_FOUND, message: "No se encontraron fotos para el artículo" });
            return;
        }

        photos.forEach(photo => {
            call.write({ photo_data: photo.photo_data });
        });
        call.end();
    } catch (err) {
        console.error(err);
        call.emit('error', { code: grpc.status.INTERNAL, message: "Error al recuperar las fotos" });
    }
}


async function fetchSalesData(startDate, endDate) {
    try {
        // Recuperar todas las compras dentro del rango de fechas especificado
        const sales = await compra.findAll({
            where: {
                fechacompra: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });

        // Recuperar los artículos asociados a cada compra
        const salesData = await Promise.all(sales.map(async (sale) => {
            const items = await articulocompra.findAll({
                where: {
                    idCompra: sale.idCompra
                },
                include: [
                    {
                        model: articulo,
                        as: 'articulo'
                    }
                ]
            });

            console.log('Artículos de la venta:', items.map(item => item.articulo.nombre));

            return { sale, items };
        }));

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
        const saleDate = sale.fechacompra.toDateString();
        if (!salesByDate[saleDate]) {
            salesByDate[saleDate] = 0;
        }
        salesByDate[saleDate] += parseFloat(sale.montofinal);

        sale.articulos.forEach(item => {
            const productName = item.nombre;
            if (!productsSold[productName]) {
                productsSold[productName] = 0;
            }
            productsSold[productName] += parseInt(item.cantidadarticulo);
        });
    });

    return { salesByDate, productsSold };
}

function generateBarChart(canvas, data) {
    const ctx = canvas.getContext('2d');
    const labels = Object.keys(data);
    const values = Object.values(data);

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / values.length;
    const maxValue = Math.max(...values);

    values.forEach((value, index) => {
        const barHeight = (value / maxValue) * (canvas.height - 50);
        ctx.fillStyle = 'rgba(75, 192, 192, 1)';
        ctx.fillRect(index * barWidth, canvas.height - barHeight, barWidth - 10, barHeight);
        ctx.fillStyle = 'black';
        ctx.fillText(labels[index], index * barWidth, canvas.height - 10);
    });

    return canvas.toBuffer('image/png');
}

async function generatePDF(salesByDate, productsSold) {
    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
        let pdfData = Buffer.concat(buffers);
        fs.writeFileSync('reporte_ventas.pdf', pdfData);
    });

    doc.fontSize(20).text('Reporte de Compras', { align: 'center' });
    doc.moveDown();

    doc.fontSize(16).text('Ventas por Fecha:');
    for (const date in salesByDate) {
        doc.fontSize(12).text(`${date}: $${salesByDate[date]}`);
    }

    doc.moveDown();
    doc.fontSize(16).text('Productos Vendidos:');
    for (const product in productsSold) {
        doc.fontSize(12).text(`${product}: ${productsSold[product]} unidades`);
    }

    // Gráfica: ventas por fecha
    const canvas1 = createCanvas(400, 200);
    const barChart1 = generateBarChart(canvas1, salesByDate);
    doc.image(barChart1, { fit: [400, 200] });
    doc.moveDown();

    // Gráfica: productos vendidos
    const canvas2 = createCanvas(400, 200);
    const barChart2 = generateBarChart(canvas2, productsSold);
    doc.image(barChart2, { fit: [400, 200] });

    doc.end();
}


async function generateSalesReportImpl(call, callback) {
    const { startDate, endDate } = call.request;

    try {
        const salesData = await fetchSalesData(startDate, endDate);
        const { salesByDate, productsSold } = processSalesData(salesData);

        // Generar el PDF y capturar el buffer en una promesa
        const pdfBuffer = await new Promise((resolve, reject) => {
            const doc = new PDFDocument();
            let buffers = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => resolve(Buffer.concat(buffers)));

            doc.fontSize(20).text('Reporte de Compras', { align: 'center' });
            doc.moveDown();
            doc.fontSize(16).text('Ventas por Fecha:');
            for (const date in salesByDate) {
                doc.fontSize(12).text(`${date}: $${salesByDate[date]}`);
            }
            doc.moveDown();
            doc.fontSize(16).text('Productos Vendidos:');
            for (const product in productsSold) {
                doc.fontSize(12).text(`${product}: ${productsSold[product]} unidades`);
            }

            // Gráfica: ventas por fecha
            const canvas1 = createCanvas(400, 200);
            const barChart1 = generateBarChart(canvas1, salesByDate);
            doc.image(barChart1, { fit: [400, 200] });
            doc.moveDown();

            // Gráfica: productos vendidos
            const canvas2 = createCanvas(400, 200);
            const barChart2 = generateBarChart(canvas2, productsSold);
            doc.image(barChart2, { fit: [400, 200] });

            doc.end();
        });

        // Enviar pdf
        callback(null, { data: pdfBuffer, name: `reporte_ventas_${new Date().toISOString()}.pdf` });
        console.log('PDF enviado');
    } catch (error) {
        console.error('Error al generar el reporte de compras:', error);
        callback({ code: grpc.status.INTERNAL, message: "Error al generar el reporte de compras" });
    }
}
