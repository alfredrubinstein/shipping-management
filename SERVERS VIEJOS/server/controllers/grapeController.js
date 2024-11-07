const Grape = require('../models/Grape');
const grapeService = require('../services/grapeServices');

exports.createGrape = async (req, res) => {
  try {
    const grape = await grapeService.createGrape(req.body);
    res.status(201).json(grape);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllGrape = async (req, res) => {
  try {
    const grape = await grapeService.getAllGrape();
    res.status(200).json(grape);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGrapeById = async (req, res) => {
  try {
    const grape = await grapeService.getGrapeById(req.params.id);
    if (!grape) {
      return res.status(404).json({ message: 'Grape not found' });
    }
    res.status(200).json(grape);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateGrape = async (req, res) => {
  try {
    const grape = await grapeService.updateGrape(req.params.id, req.body);
    if (!grape) {
      return res.status(404).json({ message: 'Grape not found' });
    }
    res.status(200).json(grape);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteGrape = async (req, res) => {
  try {
    const grape = await grapeService.deleteGrape(req.params.id);
    if (!grape) {
      return res.status(404).json({ message: 'Grape not found' });
    }
    res.status(200).json({ message: 'Grape deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};