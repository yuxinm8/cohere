const express = require('express');
const Service = require('../models/Service.js');
const Answer = require('../models/Answer.js');

const router = express.Router();

export const createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// READ all services of a specific category
export const getServiceByCategory = async (req, res) => {
    try {
      const service = await Service.find({category_id: req.params.category_id});
      if (service == null) {
        return res.status(404).json({ message: 'service not found' });
      }
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// READ a service 
export const getServiceByName = async (req, res) => {
    try {
      const service = await Service.findById(req.params.id);
      if (service == null) {
        return res.status(404).json({ message: 'service not found' });
      }
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// UPDATE a service 
// invoking after a document inserted into Answer collection
export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service == null) {
      return res.status(404).json({ message: 'service not found' });
    }
    // find all criterias of a specific service 
    const criterias = await Answer.find({service_id: req.params.id})

    // convert into (key, value) format
    const criteriaObj = criterias.reduce((obj, { question, answer }) => {
        obj[question] = answer;
        return obj;
    }, {});

    // update criteria of service 
    const criteriaJson = JSON.stringify(criteriaObj);
    service.criteria = JSON.parse(criteriaJson);;

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a Service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service == null) {
      return res.status(404).json({ message: 'service not found' });
    }
    await service.remove();
    res.status(200).json({ message: 'service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default router;