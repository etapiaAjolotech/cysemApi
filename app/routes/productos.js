const {Router} = require('express');
const {
    obtenerProductos, 
    obtenerProducto, 
    crearProducto,
    actualizarProducto,
    eliminarProducto} = require('../controllers/produtosController');

const {validarCampos} = require('../../middlewares/validar-campos');
const { validarJWT } = require('../../middlewares/validar-jwt');
const { validarRol } = require('../../middlewares/validar-rol');

const { check } = require('express-validator');
const { productoExisteID } = require('../../helpers/db-validators');


const router = Router();

//Obtener todos los productos
router.get('/', obtenerProductos);

//Obtener producto por id - publico
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(productoExisteID),
    validarCampos
], obtenerProducto)


// Crear productos - privado - cualquiera con Token valido
router.post('/', [
    validarJWT,
    check('codigoProducto', 'El código de producto es obligatorio').not().isEmpty(),
    check('marca', 'La marca es requerida').not().isEmpty(),
    validarCampos
], crearProducto)



// Actualuzar producto -privado - cualquiera con Token valido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(productoExisteID),
    validarCampos
], actualizarProducto)

//Eliminar producto - privado - cualquiera con un token valido
router.delete('/:id', [
    validarJWT,
    validarRol,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(productoExisteID),
    validarCampos
], eliminarProducto)



module.exports = router;
