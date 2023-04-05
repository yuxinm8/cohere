const express = require('express');
const Category = require('../models/Category.js');

const router = express.Router();


export const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ categories of a specific Care Path 
export const getCategoryByCarePath = async (req, res) => {
    try {
      const category = await Category.find({ path_id: req.params.path_id });
      if (category == null) {
        return res.status(404).json({ message: 'Care Path not found' });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// READ a specific category of a specific Care Path 
export const getCategoryByName = async (req, res) => {
    try {
      const category = await Category.findOne({ path_id: req.params.path_id, name: req.params.name });
      if (category == null) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// UPDATE a category
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: 'Category not found' });
    }
    category.description = req.body.description;
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await category.remove();
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default router;