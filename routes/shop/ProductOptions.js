const express = require('express');
const router = express.Router();

//Controller to products Actions
const ProductController = require('../../controllers/ProductController');

router.post('/getProducts/:category?', ProductController.getProducts);
router.post('/dropProduct', ProductController.dropProduct);
router.post('/getProductsByUser', ProductController.getProductsByUser);
router.get('/individualProduct/:id', ProductController.getIndividual);
router.post('/addProduct', ProductController.newProduct);


module.exports = router;