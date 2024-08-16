const Sale = require('../models/Sale');

exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.getSales();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las ventas.' });
  }
};

exports.getIndividualSale = async (req, res) => {
  try {
    const sale = await Sale.getSaleById(req.params.id);
    if (sale) {
      res.json(sale);
    } else {
      res.status(404).json({ message: 'Venta no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la venta.' });
  }
};

exports.addSale = async (req, res) => {
  try {
    const { dateSOLD, quantity, total, itineraryID } = req.body;
    const success = await Sale.insertSale({ data: { dateSOLD, quantity, total, itineraryID } });
    if (success) {
      res.status(201).json({ message: 'Venta agregada correctamente.' });
    } else {
      res.status(500).json({ message: 'Error al agregar la venta.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar la venta.' });
  }
};

exports.deleteSale = async (req, res) => {
  try {
    const success = await Sale.deleteSale(req.params.id);
    if (success) {
      res.json({ message: 'Venta eliminada correctamente.' });
    } else {
      res.status(404).json({ message: 'Venta no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la venta.' });
  }
};
