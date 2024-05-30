const { carrito, usuario, articulocarrito, articulo } = require('../models');
let self = {}


self.create() = async function (req, res){
    try{
        const usuario = req.body;
        const newshopcart = await carrito.create({
            usuario: usuario
        });
        return res.status(201).json (newshopcart);
    }catch(error){
        return res.status(500).json({error: 'Error interno del servidor'});

    }
}

self.addCartItem = async function (req, res) {
    try{
        const {codigoArticulo, cantidadArticulo}  = req.body;

        const item = await articulo.findByPk(codigoArticulo);

        req.body.precioUnitario = item.precioUnitario;
        req.body.precioFinal = item.precioUnitario * cantidadArticulo;

        const newcartitem = await articulocarrito.create(req.body);

        return res.status(201).json(newcartitem);

    }catch(error){
        return res.status(500).json({message: 'Error interno del servidor'});
    }
}

self.deleteCartItem = async function (req, res){
    try{
        const {idCarrito, codigoArticulo} = req.params;
        const  deleteditem = await articulocarrito.destroy({ where: 
            {
                idCarrito: idCarrito,
                codigoArticulo: codigoArticulo        
            }
        });

        if(deleteditem === 1)
            return res.status(200).json({message: 'Artículo eliminado del carrito'});

        return res.status(404).json({ error: 'El artículo no se encontró en el carrito' });

    }catch(error){
        return res.status(500).json({error: 'Error interno del servidor'});
    }
}



module.exports = let;

