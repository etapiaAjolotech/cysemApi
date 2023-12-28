const {Router} = require('express');
const controller = require('../controllers/buscarController');
const { check } = require('express-validator');


const router = Router();


router.get('/:coleccion/:termino', controller.buscador);

module.exports = router;