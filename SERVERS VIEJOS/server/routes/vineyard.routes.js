const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth.middleware');

module.exports = (vineyardController) => {
  router.get('/', authMiddleware, vineyardController.getAllVineyards);
  router.get('/:id', authMiddleware, vineyardController.getVineyardById);
  router.post('/', authMiddleware, vineyardController.createVineyard);
  router.patch('/:id', authMiddleware, vineyardController.updateVineyard);
  router.delete('/:id', authMiddleware, vineyardController.deleteVineyard);

  return router;
};