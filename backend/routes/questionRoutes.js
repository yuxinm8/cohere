const express = require('express');
const router = express.Router();
const questionController = require('./questionController');

// Routes for the Question model
router.get('/questions', questionController.getAllQuestions);
router.get('/questions/:service_id', questionController.getQuestionBySevice);
router.post('/questions', questionController.createQuestion);
router.put('/questions/:id', questionController.updateQuestionById);
router.delete('/questions/:id', questionController.deleteQuestionById);


module.exports = router;
