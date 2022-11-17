const axios = require("axios");
const unsplash = require("../utils/unsplash");
const Image = require("../models/Image");

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

const homeControllers = {
    getImages: async (req, res) => {
        try {
            // console.log(req.query)
            const features = new APIfeatures(Image.find({ category: { $ne: "k16" } }), req.query).sorting().paginating()
            const images = await features.query

            // const images = Image.find({ category: { $ne: "k16" } })

            res.status(200).json({
                success: true,
                message: "Get images successfully",
                images: images,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
}

module.exports = homeControllers;
