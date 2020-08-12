const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    photoUrl: String,
    description: String,
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Post', PostSchema);