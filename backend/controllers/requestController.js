const express = require('express');
const Request = require('../models/Request.js');
const Service = require('../models/Service.js');
const User = require('../models/User.js');
const criteriaChecker = require('../utils/criteriaChecker.js');

const router = express.Router();

export const createRequest = async (req, res) => {
try {
    const { patient_id, issue_id, category_id, service_id } = req.body;

    const newRequest = new Request({
        patient_id,
        issue_id,
        category_id,
        service_id,
        status: 'Pending'
    });

    const savedRequest = await newRequest.save();
    await checkRequest(newRequest);
    res.status(201).json(savedRequest);
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
    }
};
export const checkRequest = async (req, res) => { 
    const serviceRequest = await Request.findById(req.params.id);
    const service = await Service.findById(serviceRequest.service_id);
    const user = await User.findById(serviceRequest.patient_id);

    const isCriteriaMet = criteriaChecker.checkCriteria(user.symptom, service.criteria);

    if (isCriteriaMet) {
        await updateRequest(serviceRequest._id, 'approved');
    }
};

  
// Get all requests of a patient
export const getRequests = async (req, res) => {
    try {
        const serviceRequest = await Request.find({ patient_id: req.params.patient_id });
        res.status(200).json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
  
// Update a request
export const updateRequest = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const request = await Request.findById(id);
  
      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }
  
      request.status = status;
      const savedRequest = await request.save();
  
      res.status(201).json(savedRequest);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
};
  
// Delete a request
export const deleteRequest = async (req, res) => {
    try {
      const { id } = req.params;
  
      const request = await Request.findById(id);
  
      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }
  
      await request.remove();
  
      res.status(200).json({ message: 'Request removed' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
};