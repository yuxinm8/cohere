const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    issue_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalIssue',
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
   
    status: {
        type: String,
        enum: ['Approved', 'Pending', 'Denied', 'Cancelled'],
        required: true
    }
});

const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;
