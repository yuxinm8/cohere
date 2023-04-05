const mongoose = require('mongoose');

const MedicalIssueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    }
});

const MedicalIssue = mongoose.model('MedicalIssue', MedicalIssueSchema);

module.exports = MedicalIssue;