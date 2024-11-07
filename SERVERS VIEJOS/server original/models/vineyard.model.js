const mongoose = require('mongoose');

// Vineyard Model
const vineyardSchema = new mongoose.Schema({
  _id: { type: String, alias: 'vineyardName' }, // vineyardName as the id
  vineyardArea: String,
  vineyard: String,
  contactPersonVineYard: String
});

const Vineyard = mongoose.model('Vineyard', vineyardSchema);

// Truck Model
const truckSchema = new mongoose.Schema({
  _id: { type: String, alias: 'vehiclePlate' }, // vehiclePlate as the id
  conductor: String,
  driverPhone: String,
  typeOfTruck: String,
  emptyWeight: Number // Optional: common empty weight of this truck type
});

const Truck = mongoose.model('Truck', truckSchema);

// Shipment Model
const shipmentSchema = new mongoose.Schema({
  shipmentNumber: { type: Date, default: Date.now }, // Changed to date and time of creation
  statusOfShipment: {
    type: String,
    enum: [
      'UnauthorizedShipmentOfGrape',
      'DirectorAuthorizedShipment',
      'MashguiajAuthorizedShipment',
      'ShippingWithAllAuthorizations',
      'ArrivedAtTheFactory',
      'GrapeUnloaded',
      'LaboratoryResponseReceived'
    ]
  },
  fullTruckWeight: Number,
  IsAutomaticEntryAnnotations: Boolean,
  receivingTemperature: Number,
  arrivalTime: Date,
  departureTime: Date,
  receivingTank: String,
  sentBy: String,
  comments: String,
  scrambled: Boolean,
  rotten: Boolean,
  sulfitAdded1: Boolean,
  sulfitAdded2: Boolean,
  ensimesAdded: Boolean,
  ph: Number,
  sugarLevel: Number,
  acidityLevel: Number,
  alcoholContent: Number,
  colorIntensity: Number,
  aromaProfile: String,
  totalWeight: Number,
  harvestDate: Date,
  shipmentDate: Date,
  isManualHarvest: Boolean,
  grapeVariety: String,
  isKosher: Boolean,
  isAuthorized: Boolean,
  vineyardName: { type: String, ref: 'Vineyard' }, // Reference to Vineyard
  containers: Number,
  vehiclePlate: { type: String, ref: 'Truck' } // Reference to Truck
});

const Shipment = mongoose.model('Shipment', shipmentSchema);

// User Model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String
});

const User = mongoose.model('User', userSchema);

module.exports = { Vineyard, Truck, Shipment, User };