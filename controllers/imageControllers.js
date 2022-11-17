const Image = require('../models/Image')

const imageControllers = {
    reviews: async (req, res) => {
        try {
            const image = await Image.findById(req.params.id)
            if (!image) return res.status(400).json({ msg: 'Image does not exist.' })

            // update amount comment
            let num = image.amountComment
            await Image.findOneAndUpdate({ _id: req.params.id }, {
                amountComment: num + 1
            })

            res.status(200).json({ msg: 'Update success' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getRelatedImages: async (req, res) => {
        try {
            let images = []
            const image = await Image.findById(req.params.id)
            if (!image) return res.status(400).json({ msg: 'Image does not exist.' })
            images.push(image)

            // get relate image
            let relatedImages = image.subCategory
            let imagesRef = await Image.find({ subCategory: relatedImages })
            imagesRef.map(img => {images.push(img)})

            res.status(200).json({ images })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = imageControllers
