const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    name: String,
    email: String,
    query: String,
    date: {
        type: Date,
        default: Date.now
    },
    comment: { type: Array },
    likes: { type: Number }
})


module.exports = mongoose.model('queryModel', PostSchema);