const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');
const { register, login } = require('../controllers/userController');
const Entry = require('../models/Entry');

// Rutas de autenticación
router.post('/register', register);
router.post('/login', login);

// Ruta para la entrada a fábrica y peso de camión (Rol 1)
router.post('/entrada-fabrica', verifyToken, checkRole(1), async (req, res) => {
    const { truckWeight } = req.body;
    try {
        const entry = new Entry({ truckWeight });
        await entry.save();
        res.status(201).json({ message: 'Entrada registrada' });
    } catch (err) {
        res.status(500).json({ message: 'Error al registrar la entrada' });
    }
});

// Ruta para el recibimiento de grape y toma de temperatura (Rol 2)
router.post('/recibimiento-grape', verifyToken, checkRole(2), async (req, res) => {
    const { vineyard, grapeType, temperature } = req.body;
    try {
        const entry = new Entry({ vineyard, grapeType, temperature });
        await entry.save();
        res.status(201).json({ message: 'Recibimiento registrado' });
    } catch (err) {
        res.status(500).json({ message: 'Error al registrar el recibimiento' });
    }
});

// Ruta para el laboratorio (Rol 3)
router.post('/laboratorio', verifyToken, checkRole(3), async (req, res) => {
    const { chemicalData } = req.body;
    try {
        const entry = new Entry({ chemicalData });
        await entry.save();
        res.status(201).json({ message: 'Datos de laboratorio registrados' });
    } catch (err) {
        res.status(500).json({ message: 'Error al registrar los datos de laboratorio' });
    }
});

// Ruta para el director general (Rol 4)
router.get('/datos-generales', verifyToken, checkRole(4), async (req, res) => {
    try {
        const entries = await Entry.find();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los datos generales' });
    }
});

module.exports = router;
