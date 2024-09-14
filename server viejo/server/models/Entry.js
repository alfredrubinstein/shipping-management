const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    truckWeight: Number,
    vineyard: String,
    grapeType: String,
    temperature: Number,
    chemicalData: Object,
    createdAt: { type: Date, default: Date.now },
});

const Entry = mongoose.model('Entry', entrySchema);
module.exports = Entry;
