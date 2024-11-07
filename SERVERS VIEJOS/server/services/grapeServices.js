const Grape = require('../models/Grape');

exports.createGrape = async (grapeData) => {
  return await Grape.create(grapeData);
};

exports.getAllGrape = async () => {
  return await Grape.find();
};

exports.getGrapeById = async (id) => {
  return await Grape.findById(id);
};

exports.updateGrape = async (id, grapeData) => {
  return await Grape.findByIdAndUpdate(id, grapeData, { new: true });
};

exports.deleteGrape = async (id) => {
  return await Grape.findByIdAndDelete(id);
};