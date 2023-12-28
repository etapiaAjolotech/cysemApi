const {Router} = require('express');
const controller = require('../controllers/authController');
const {validarCampos} = require('../../middlewares/validar-campos');

const { check } = require('express-validator');


const router = Router();


router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], controller.login);

module.exports = router;