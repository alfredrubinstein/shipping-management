const express = require('express');
const router = express.Router();
const grapeController = require('../controllers/grapeController');
const auth = require('../middleware/auth');

router.post('/grape', auth, grapeController.createGrape);

module.exports = router;