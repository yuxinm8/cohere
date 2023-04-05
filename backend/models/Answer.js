const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    answer: {
        type: String,
        required: true
    },
    question: {
        type: String,
        ref: 'Question',
        required: true
    }, 
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    }, 
    
});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;