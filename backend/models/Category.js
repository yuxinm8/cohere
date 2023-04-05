const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    path_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CarePath',
        required: true
    }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;