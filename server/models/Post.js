const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    title: String,
    //photoUrl: { type: match(/^http.*\.(jpeg|jpg|gif|png)$/) != null },
    photoUrl: String,
    description: String,
    date: {
        type: Date,
        default: Date.now
    },
    comment: { type: Array },
    likes: { type: Number }
})


module.exports = mongoose.model('Post', PostSchema);