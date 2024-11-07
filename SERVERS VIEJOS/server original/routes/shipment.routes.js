const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth.middleware');

module.exports = (shipmentController) => {
  router.get('/', authMiddleware, shipmentController.getAllShipments);
  router.get('/:id', authMiddleware, shipmentController.getShipmentById);
  router.post('/', authMiddleware, shipmentController.createShipment);
  router.patch('/:id', authMiddleware, shipmentController.updateShipment);
  router.patch('/:id/status', authMiddleware, shipmentController.updateShipmentStatus);
  router.delete('/:id', authMiddleware, shipmentController.deleteShipment);

  return router;
};