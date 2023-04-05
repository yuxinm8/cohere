const express = require('express');
const MedicalIssue = require('../models/MedicalIssue.js');

const router = express.Router();

export const createMedicalIssue = async (req, res) => {
  try {
    const medicalIssue = new MedicalIssue(req.body);
    await medicalIssue.save();
    res.status(201).json(medicalIssue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ all medical issues
export const getAllMedicalIssues = async (req, res) => {
  try {
    const medicalIssues = await MedicalIssue.find();
    res.status(200).json(medicalIssues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ a single medical issue by name
export const getMedicalIssueByName = async (req, res) => {
  try {
    const medicalIssue = await MedicalIssue.findOne({ name: req.params.name });
    if (medicalIssue == null) {
      return res.status(404).json({ message: 'Medical issue not found' });
    }
    res.status(200).json(medicalIssue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a medical issue
export const updateMedicalIssue = async (req, res) => {
  try {
    const medicalIssue = await MedicalIssue.findOne({ name: req.params.name });
    if (medicalIssue == null) {
      return res.status(404).json({ message: 'Medical issue not found' });
    }
    medicalIssue.description = req.body.description;
    await medicalIssue.save();
    res.status(200).json(medicalIssue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a medical issue
export const deleteMedicalIssue = async (req, res) => {
  try { 
    const medicalIssue = await MedicalIssue.findById(req.params.id);
    if (medicalIssue == null) {
      return res.status(404).json({ message: 'Medical issue not found' });
    }
    await medicalIssue.remove();
    res.status(200).json({ message: 'Medical issue deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default router;