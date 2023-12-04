const {Router} = require('express');
const controller = require('../controllers/produtosController')
const router = Router();

router.get('/', controller.getData)


module.exports = router;
