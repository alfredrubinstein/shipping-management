require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const grapeRoutes = require('./routes/grapeRoutes');

const authRoutes = require('./routes/authRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api',grapeRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: `Route ${req.url} Not Found` });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));