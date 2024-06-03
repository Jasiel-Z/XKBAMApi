const { carrito, usuario, articulocarrito, articulo } = require('../models');
const { Op } = require('sequelize');
let self = {}


self.create = async function(req, res){
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

self.addCartItem = async function(req, res) {
    try {
        const { codigoArticulo, cantidadArticulo, idTalla, idCarrito } = req.body;

        
        // Verificar si el artículo existe
        const item = await articulo.findByPk(codigoArticulo);
        if (!item) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }

        const itemC = await carrito.findByPk(idCarrito);
        if (!itemC) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        // Calcular el precio final del artículo
        const precioFinal = item.precio * cantidadArticulo;

        // Crear un nuevo objeto de artículo de carrito
        const newCartItem = await articulocarrito.create({
            cantidadArticulo: cantidadArticulo,
            precioUnitario: item.precio,
            precioFinal: precioFinal,
            codigoArticulo: codigoArticulo,
            idCarrito: idCarrito,
            idTalla: idTalla
        });

        return res.status(201).json(newCartItem);

    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

self.deleteCartItem = async function(req, res){
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

self.getCartItemsByCartId = async function(req, res) {
    try {
        const { idCarrito } = req.params;

        // Buscar todos los registros de articulocarrito asociados al carrito dado su ID
        const cartItems = await articulocarrito.findAll({
            where: { idCarrito: idCarrito },
            attributes: { exclude: ['carritoIdCarrito'] } // Excluir la columna 'carritoIdCarrito'
        });

        // Verificar si se encontraron registros
        if (cartItems.length === 0) {
            return res.status(404).json({ message: 'No se encontraron artículos en el carrito' });
        }

        // Devolver los registros encontrados
        return res.status(200).json(cartItems);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

self.getCartIdByUserId = async function(req, res) {
    try {
        const { usuario } = req.params;

        // Buscar el carrito asociado al usuario dado su ID
        const cart = await carrito.findOne({
            where: { usuario: usuario },
            attributes: ['idCarrito']
        });

        if (!cart) {
            return res.status(404).json({ message: 'No se encontró un carrito para el usuario dado' });
        }

        return res.status(200).json({ idCarrito: cart.idCarrito });
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}


module.exports = self;

