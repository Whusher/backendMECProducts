const express = require('express');
const router = express.Router();

//Controller to products Actions
const ProductController = require('../../controllers/ProductController');

router.get('/getProducts/:user', ProductController.getProducts);
router.post('/addProduct', ProductController.newProduct);


module.exports = router;