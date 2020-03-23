const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = Schema({
    name: String,
    create_time: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Category', CategorySchema);
