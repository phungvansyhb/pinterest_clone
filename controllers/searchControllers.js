const Image = require("../models/Image");
const unsplash = require("../utils/unsplash");

searchControllers = {
    search: async (req, res) => {
        try {
            let searchContent = req.query.category;
            // get images from db
            let images = await Image.find({ subCategory: { $regex: '.*' + searchContent + '.*' } });

            try {
                // get images from unsplash
                if (images.length <= 0) {
                    const response = await unsplash.get('https://api.unsplash.com/search/photos', {
                        params: {
                            query: `${searchContent}`
                        }
                    });
                    images = response.data.results.map(item => {
                        return {
                            _id: item.id,
                            title: item.description || req.params.category,
                            description: item.alt_description,
                            srcImage: item.urls.raw,
                            category: req.params.category,
                            subCategory: "",
                            nameMember: "",
                            amountComment: 0
                        }
                    })
                }
                // get successfully. all good
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
                // get images from db
                let images = await Image.find({ nameMember: { $regex: '.*' + searchContent + '.*' } });
                
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

module.exports = searchControllers;
