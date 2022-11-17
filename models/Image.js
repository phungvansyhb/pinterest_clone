const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    title: { type: String, },
    description: { type: String, },
    srcImage: { type: String, required: true, },
    category: { type: String, required: true, },
    subCategory: { type: String, },
    nameMember: { type: String, },
    amountComment: { type: Number, },
}, {
    timestamps: true
})

module.exports = mongoose.model('Image', ImageSchema)