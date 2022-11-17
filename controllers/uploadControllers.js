const Image = require("../models/Image");

const uploadControllers = {
    saveToMongoDB: async (req, res) => {
        try {
            req.files.map(async file => {
                const newImage = new Image({
                    title: '',
                    description: '',
                    srcImage: file.path,
                    category: 'a1-k16',
                    subCategory: 'phan-loai-sau',
                    nameMember: '',
                    amountComment: 0,
                });
                await newImage.save();
            })
            return res.set('images').status(200).json('Successfully!');
        }
        catch (err) {
            console.log(err)
        }
    },
}

module.exports = uploadControllers;
