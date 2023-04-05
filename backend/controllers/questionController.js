const express = require('express');
const Question = require('../models/Question');

const router = express.Router();

// Create a new question
export const createQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json({ message: 'Question created successfully'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get questions by service
export const getQuestionBySevice = async (req, res) => {
  try {
    const questions = await Question.find({service_id: req.params.service_id});
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a question by ID
export const updateQuestionById = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json({ message: 'Question updated successfully'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a question by ID
export const deleteQuestionById = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json({ message: 'Question deleted successfully', question });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
