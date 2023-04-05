const express = require('express');
const CarePath = require('../models/CarePath.js');

const router = express.Router();


export const createCarePath = async (req, res) => {
  try {
    const carePath = new CarePath(req.body);
    await carePath.save();
    res.status(201).json(carePath);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ all care paths of a specific Care Path 
export const getCarePathByIssue = async (req, res) => {
    try {
      const carePath = await CarePath.find({ issue_id: req.params.issue_id });
      if (carePath == null) {
        return res.status(404).json({ message: 'Care Path not found' });
      }
      res.status(200).json(carePath);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// READ one care path of a specific Care Path 
export const getCarePathByName = async (req, res) => {
    try {
      const carePath = await CarePath.findOne({ issue_id: req.params.issue_id, name: req.params.name });
      if (carePath == null) {
        return res.status(404).json({ message: 'Care Path not found' });
      }
      res.status(200).json(carePath);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// UPDATE a care path
export const updateCarePath = async (req, res) => {
  try {
    const carePath = await CarePath.findOne({ name: req.params.name });
    if (carePath == null) {
      return res.status(404).json({ message: 'Care Path not found' });
    }
    carePath.description = req.body.description;
    await carePath.save();
    res.status(200).json(carePath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a Care Path
export const deleteCarePath = async (req, res) => {
  try {
    const carePath = await CarePath.findById(req.params.id);
    if (carePath == null) {
      return res.status(404).json({ message: 'Care Path not found' });
    }
    await carePath.remove();
    res.status(200).json({ message: 'Care Path deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default router;