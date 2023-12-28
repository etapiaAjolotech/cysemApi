const {Router} = require('express');
const controller = require('../controllers/uploadsController');
const {validarCampos} = require('../../middlewares/validar-campos');
const { check } = require('express-validator');
const router = Router();

router.post('/', controller.cargarArchivo)

module.exports = router;