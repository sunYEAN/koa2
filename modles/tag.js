const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TagSchema = Schema({
    name: String,
    create_time: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Tag', TagSchema);
