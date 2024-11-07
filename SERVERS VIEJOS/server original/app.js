const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importar las rutas individuales directamente
const vineyardRoutes = require('./routes/vineyard.routes');
const truckRoutes = require('./routes/truck.routes');
const shipmentRoutes = require('./routes/shipment.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/vineyards', vineyardRoutes);
app.use('/api/trucks', truckRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/users', userRoutes);

// Error handling
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
