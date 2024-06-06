const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const dotenv = require("dotenv");
const { Sequelize, Op } = require('sequelize');
const { multimedia, compra, articulocompra } = require('./models');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path'); // Asegúrate de requerir el módulo 'path'

const PROTO_PATH = "./proto/multimedia.proto"
const Chart = require('chart.js');


dotenv.config()

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const multiProto = grpc.loadPackageDefinition(packageDefinition);


const server = new grpc.Server();
server.addService(multiProto.MultimediaService.service, {
    getMultimedia: getMultimediaImpl,
    uploadMultimedia: uploadMultimediaImpl,
    generateSalesReport: generateSalesReportImpl

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

async function generateSalesReportImpl(call, callback) {
    const { start_date, end_date } = call.request;

    try {
        const salesData = await fetchSalesData(start_date, end_date);
        const { salesByDate, productsSold } = processSalesData(salesData);
        const pdfBuffer = await generatePDF(salesByDate, productsSold);
        
        // Enviar el pdf
        const response = new GeneraterReportResponse();
        response.setPdfData(pdfBuffer);
        callback(null, response);
    } catch (error) {
        console.error('Error al generar el reporte de compras:', error);
        callback({ code: grpc.status.INTERNAL, message: "Error al generar el reporte de compras" });
    }
}


async function fetchSalesData(start_date, end_date) {
    return await compra.findAll({
        where: {
            fechacompra: {
                [Op.between]: [start_date, end_date]
            }
        },
        include: [
            {
                model: articulocompra,
                as: 'articulos'
            }
        ]
    });
}

function processSalesData(salesData) {
    const salesByDate = {};
    const productsSold = {};

    salesData.forEach(sale => {
        const saleDate = sale.fechacompra.toDateString();
        if (!salesByDate[saleDate]) {
            salesByDate[saleDate] = 0;
        }
        salesByDate[saleDate] += sale.montofinal;

        sale.articulos.forEach(item => {
            const productName = item.nombre;
            if (!productsSold[productName]) {
                productsSold[productName] = 0;
            }
            productsSold[productName] += item.cantidadarticulo;
        });
    });

    return { salesByDate, productsSold };
}

async function generatePDF(salesByDate, productsSold) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    let y = page.getHeight() - 50;

    page.drawText('Reporte de Compras', {
        x: page.getWidth() / 2,
        y,
        size: 20,
        color: rgb(0, 0, 0),
        textAlign: 'center',
    });

    y -= 30;

    // Ventas por fecha
    page.drawText('Ventas por Fecha:', {
        x: 50,
        y,
        size: 16,
        color: rgb(0, 0, 0),
    });
    y -= 20;

    for (const date in salesByDate) {
        page.drawText(`${date}: $${salesByDate[date]}`, {
            x: 50,
            y,
            size: 12,
            color: rgb(0, 0, 0),
        });
        y -= 20;
    }

    y -= 10;

    page.drawText('Productos Vendidos:', {
        x: 50,
        y,
        size: 16,
        color: rgb(0, 0, 0),
    });
    y -= 20;

    for (const product in productsSold) {
        page.drawText(`${product}: ${productsSold[product]} unidades`, {
            x: 50,
            y,
            size: 12,
            color: rgb(0, 0, 0),
        });
        y -= 20;
    }

    // Gráfica: ventas por fecha
    const canvas1 = createCanvas(400, 200);
    generateBarChart(canvas1, salesByDate);
    const barChart1 = canvas1.toBuffer();
    page.drawImage(barChart1, {
        x: 50,
        y: y - 200,
        width: 400,
        height: 200,
    });

    // Gráfica: productos vendidos
    const canvas2 = createCanvas(400, 200);
    generateBarChart(canvas2, productsSold);
    const barChart2 = canvas2.toBuffer();
    page.drawImage(barChart2, {
        x: 50,
        y: y - 400,
        width: 400,
        height: 200
    });

    const pdfBytes = await pdfDoc.save();
    const pdfName = `reporte_ventas_${new Date().toISOString()}.pdf`; 
    const pdfPath = `./reports/${pdfName}`;
    fs.writeFileSync(pdfPath, pdfBytes);  
    return pdfBytes;
}