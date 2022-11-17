const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    username: String,
    content: String,
    image_id: String,
    reply: Array
}, {
    timestamps: true
})

module.exports = mongoose.model('Comment', CommentSchema)