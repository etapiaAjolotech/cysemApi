const express = require('express');

const controller = require('../controllers/produtosController')

const router = express.Router();



const path = 'productos';

/**
 * Ruta: /productos GET
 */
router.get(
    `/${path}`,
    controller.getData
)

module.exports = router;