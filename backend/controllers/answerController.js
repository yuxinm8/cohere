const express = require('express');
const Answer = require('../models/answer.js');

const router = express.Router();

// Create a new Answer
export const createAnswer = async (req, res) => {
  try {
    const answer = new Answer(req.body);

    const newAnswer = await answer.save();

    // Update the Service
    await updateService(newAnswer.service_id);

    res.status(201).json(newAnswer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


