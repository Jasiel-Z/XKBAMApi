const router = require('express').Router();
const Joi = require('joi');
const carritos = require('../controllers/carritos.controller');
const  { validateItemToAdd  } = require('../validations/shopcartvalidation');
const joiValidation  = require('../middlewares/validationmidleware');
const validationErrorHandler = require('../middlewares/validationerrorhandler');
const cartItemSchema = require('../schemas/cartitemschema');
const Authorize = require('../middlewares/autenticacion');

//POST  api/carritos
router.post('/articulo',validateItemToAdd, carritos.addCartItem)

router.get('/:idCarrito',Authorize('Cliente,Administrador'), carritos.getCartItemsByCartId);

router.get('/carritousuario/:usuario',Authorize('Cliente,Administrador'), carritos.getCartIdByUserId);

router.put('/cantidad',Authorize('Cliente,Administrador'), carritos.updateCartItemQuantity);

router.delete('/vaciar/:idArticuloCarrito',Authorize('Cliente,Administrador'), carritos.deleteCartItem);

module.exports = router;