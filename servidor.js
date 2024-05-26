const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const dotenv = require("dotenv");
//const fs = require("fs");
const { Sequelize } = require('sequelize');
const { multimedia } = require('../models');
const PROTO_PATH = "./proto/multimedia.proto"

dotenv.config()

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const multiProto = grpc.loadPackageDefinition(packageDefinition);


const server = new grpc.Server();
server.addService(multiProto.MultimediaService.service, {
    getMultimedia: getMultimediaImpl,
    upploadMultimedia: upploadMultimediaImpl 

});

server.bindAsync(`localhost:${process.env.GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), () =>{
    console.log(`Servidor GRPC en ejecución en el puerto ${process.env.GRPC_PORT}`)
});

async function uploadMultimediaImpl(call, callback) {
    const { idarticulo, nombre, contenido } = call.request;
    try {
        const newPhoto = await multimedia.create({
            idarticulo: idarticulo,
            nombre: nombre,
            contenido: contenido
        });
        callback(null, { response: "Multimedia subida exitosamente" });
    } catch (err) {
        console.error(err);
        callback({ code: grpc.status.INTERNAL, message: "Error al guardar la multimedia" });
    }
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
