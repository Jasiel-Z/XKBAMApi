const { carrito, usuario, articulocarrito, articulo } = require('../models');
let self = {}


self.create() = async function (req, res){
    try{
        const idusuario = req.body;
        const newshopcart = await carrito.create({
            idusuario: idusuario
        });
        return res.status(201).json (newshopcart);
    }catch(error){
        return res.status(500).json({error: 'Error interno del servidor'});

    }
}

self.addItem = async function (req, res) {
    try{
        const {idarticulo, cantidadarticulo}  = req.body;

        

    }catch(error){
        return res.status(500).json({message: 'Error interno del servidor'});
    }
}


module.exports = let;

