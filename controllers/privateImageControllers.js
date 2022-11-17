const Image = require("../models/Image");
const unsplash = require("../utils/unsplash");

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    sorting() {
        this.query = this.query.sort('-createdAt')
        return this;
    }
    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 5
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

privateImageControllers = {
    getAll: async (req, res) => {
        try {
            // get images from db
            try {
                const features = new APIfeatures(Image.find({ category: 'k16' }), req.query).sorting().paginating()
                const images = await features.query
                // let images = await Image.find({ category: 'k16' });

                res.status(200).json({
                    success: true,
                    message: "Get images successfully",
                    images: images,
                });
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    },

    filterByName: async (req, res) => {
        try {
            let searchContent = req.query.name;

            try {
                let images = await Image.find({ nameMember: searchContent });

                res.status(200).json({
                    success: true,
                    message: "Get images successfully",
                    images: images,
                });
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    },

    filterByCategory: async (req, res) => {
        try {
            let searchContent = req.params.category;

            try {
                let images = await Image.find({ subCategory: searchContent });

                res.status(200).json({
                    success: true,
                    message: "Get images successfully",
                    images: images,
                });
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
}

module.exports = privateImageControllers;
