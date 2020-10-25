const express = require('express');
const router = express.Router();

const crudController = require('../controllers/crudController.js');
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/regis', authController.register);
router.get('/menu', crudController.getmenu);
router.post('/checkout', crudController.checkoutHead);

// router.post('/insert', crudController.insert);
// router.get('/select', crudController.select);
// router.post('/delete', crudController.delete);
// router.post('/cart', crudController.cart);
// router.post('/admindata', authController.admindata);

module.exports = router;
