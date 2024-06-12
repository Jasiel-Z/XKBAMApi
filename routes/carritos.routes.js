const router = require('express').Router();
const Joi = require('joi');
const carritos = require('../controllers/carritos.controller');
const  { validateItemToAdd  } = require('../validations/shopcartvalidation');
const joiValidation  = require('../middlewares/validationmidleware');
const validationErrorHandler = require('../middlewares/validationerrorhandler');
const cartItemSchema = require('../schemas/cartitemschema');

//POST  api/carritos
router.post('/articulo',validateItemToAdd, carritos.addCartItem)

router.get('/:idCarrito', carritos.getCartItemsByCartId);

router.get('/carritousuario/:usuario', carritos.getCartIdByUserId);

router.put('/cantidad', carritos.updateCartItemQuantity);

router.delete('/vaciar/:idArticuloCarrito', carritos.deleteCartItem);

module.exports = router;