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

        const item = await articulo.findByPk(codigoArticulo);
        if (!item) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }

        const itemC = await carrito.findByPk(idCarrito);
        if (!itemC) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const precioFinal = item.precio * cantidadArticulo;

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

self.updateCartItemQuantity = async function(req, res) {
    try {
        const { idArticuloCarrito, cantidadArticulo } = req.body;

        const cartItem = await articulocarrito.findByPk(idArticuloCarrito, {
            attributes: { exclude: ['carritoIdCarrito'] }
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Artículo en el carrito no encontrado' });
        }

        if (cantidadArticulo < 1 || cantidadArticulo > 10) {
            return res.status(400).json({ message: 'La cantidad debe estar entre 1 y 10' });
        }

        const item = await articulo.findByPk(cartItem.codigoArticulo);
        if (!item) {
            return res.status(404).json({ message: 'Artículo original no encontrado' });
        }

        cartItem.cantidadArticulo = cantidadArticulo;
        cartItem.precioFinal = item.precio * cantidadArticulo;

        await cartItem.save();

        return res.status(200).json(cartItem);

    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

self.deleteCartItem = async function(req, res) {
    try {
        const { idArticuloCarrito } = req.params;

        const deletedCartItem = await articulocarrito.destroy({
            where: { idArticuloCarrito: idArticuloCarrito },
            attributes: { exclude: ['carritoIdCarrito'] } 
        });

        if (!deletedCartItem) {
            return res.status(404).json({ message: 'No se encontró el artículo en el carrito' });
        }

        return res.status(200).json({ message: 'Artículo eliminado del carrito correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

self.getCartItemsByCartId = async function(req, res) {
    try {
        const { idCarrito } = req.params;

        const cartItems = await articulocarrito.findAll({
            where: { idCarrito: idCarrito },
            attributes: { exclude: ['carritoIdCarrito'] } 
        });

        if (cartItems.length === 0) {
            return res.status(404).json({ message: 'No se encontraron artículos en el carrito' });
        }

        return res.status(200).json(cartItems);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

self.getCartIdByUserId = async function(req, res) {
    try {
        const { usuario } = req.params;

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

