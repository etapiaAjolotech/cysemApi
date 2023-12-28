const {Router} = require('express');
const controller = require('../controllers/userController');
const { check } = require('express-validator');

const {validarCampos} = require('../../middlewares/validar-campos');
const { validarJWT } = require('../../middlewares/validar-jwt');
const { validarRol } = require('../../middlewares/validar-rol');

const {rolValido, emailExiste, usuarioExisteID} = require('../../helpers/db-validators');

const router = Router();

router.get('/', controller.getData)

router.post('/',[
  check('userName', 'El nombre es requerido').not().isEmpty(),
  check('email', 'El correo no es valido').isEmail(),
  check('email').custom(emailExiste),
  check('password', 'El password debe contener mas de 6 letras').isLength({min: 6}),
  check('phone', 'El telefono es requerido').not().isEmpty(),
  check('rol').custom(rolValido),
  validarCampos
] , controller.inserData)

router.put('/:id', [
  check('id').custom(usuarioExisteID),
  check('rol').custom(rolValido),
  validarCampos
], controller.updateData)

router.delete('/:id', [
  validarJWT,
  validarRol,
  check('id', 'No es un id valido').isUUID(),
  check('id').custom(usuarioExisteID),
  validarCampos
], controller.delteData)




module.exports = router;
