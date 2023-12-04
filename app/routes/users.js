const {Router} = require('express');
const controller = require('../controllers/userController');
const { check } = require('express-validator');
const {validarCampos} = require('../../middlewares/validar-campos');
const {rolValido, emailExiste} = require('../../helpers/db-validators');
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
router.put('/')
router.delete('/')




module.exports = router;
