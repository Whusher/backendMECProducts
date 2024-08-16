const express = require('express');
const router = express.Router();

// Controlador de Ventas
const SaleController = require('../../controllers/SaleController');

router.get('/getSales', SaleController.getSales);
router.get('/getIndividualSale/:id', SaleController.getIndividualSale);
router.post('/addSale', SaleController.addSale);
router.delete('/deleteSale/:id', SaleController.deleteSale);

module.exports = router;
