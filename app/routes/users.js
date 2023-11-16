const express = require('express');
const controller = require('../controllers/userController')
const router = express.Router();
const path = 'user';

router.get(`/${path}`, controller.getData)
router.post(`/${path}`, controller.inserData)


module.exports = router;
