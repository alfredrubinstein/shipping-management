const express = require('express');
const router = express.Router();

const vineyardRoutes = require('./vineyard.routes');
const truckRoutes = require('./truck.routes');
const shipmentRoutes = require('./shipment.routes');
const userRoutes = require('./user.routes');
const calculationRoutes = require('./calculation.routes');

module.exports = (controllers) => {
  // Vineyard routes
  router.use('/vineyards', vineyardRoutes(controllers.vineyardController));

  // Truck routes
  router.use('/trucks', truckRoutes(controllers.truckController));

  // Shipment routes
  router.use('/shipments', shipmentRoutes(controllers.shipmentController));

  // User routes
  router.use('/users', userRoutes(controllers.userController));

  // Calculation routes
  router.use('/calculations', calculationRoutes(controllers.calculationController));

  return router;
};