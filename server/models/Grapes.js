const mongoose = require('mongoose');

const grapeSchema = new mongoose.Schema({
  entradaFabrica: {
    shipmentNumber: String,
    licensePlateNumber: String,
    fullTruckWeight: Number,
    emptyTruckWeight: Number,
    isAutomatic: Boolean
  },
  recibimientoGrape: {
    temperature: Number,
    arrivalTime: String,
    departureTime: String,
    receivingTank: String,
    sentBy: String,
    comments: String,
    scrambled: Boolean,
    rotten: Boolean,
    sulfitAdded1: Boolean,
    sulfitAdded2: Boolean,
    ensimesAdded: Boolean
  },
  laboratorio: {
    ph: Number,
    sugarLevel: Number,
    acidityLevel: Number,
    alcoholContent: Number,
    colorIntensity: Number,
    aromaProfile: String
  },
  vinedoGrape: {
    conductor: String,
    vehiclePlate: String,
    vineyardName: String,
    vineyardArea: String,
    vineyard: String,
    contactPerson: String,
    contactNumber: String,
    typeOfTruck: String,
    containers: Number,
    totalWeight: Number,
    harvestDate: Date,
    shipmentDate: Date,
    isManualHarvest: Boolean,
    grapeVariety: String,
    isKosher: Boolean,
    isAuthorized: Boolean,
    comments: String
  }
});

module.exports = mongoose.model('Grape', grapeSchema);