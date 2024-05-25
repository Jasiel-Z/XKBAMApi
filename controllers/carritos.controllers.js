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

self.addCartItem = async function (req, res) {
    try{
        const {idarticulo, cantidadarticulo}  = req.body;

        const item = await articulo.findByPk(idarticulo);

        req.body.preciounitario = item.preciounitario;
        req.body.preciofinal = item.preciounitario * cantidadarticulo;

        const newcartitem = await articulocarrito.create(req.body);

        return res.status(201).json(newcartitem);

    }catch(error){
        return res.status(500).json({message: 'Error interno del servidor'});
    }
}

self.deleteCartItem = async function (req, res){
    try{
        const {idcarrito, idarticulo} = req.params;
        const  deleteditem = await articulocarrito.destroy({ where: 
            {
                idcarrito: idcarrito,
                idarticulo: idarticulo        
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

