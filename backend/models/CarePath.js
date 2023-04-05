const mongoose = require('mongoose');

const CarePathSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    issue_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalIssue',
        required: true
    },
    description: {
        type: String
    }
});

const CarePath = mongoose.model('CarePath', CarePathSchema);

module.exports = CarePath;