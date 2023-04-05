const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    
    Service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    }
    
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;