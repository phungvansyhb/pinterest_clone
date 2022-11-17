const router = require("express").Router();
const upload = require("../utils/multer");
const uploadControllers = require("../controllers/uploadControllers");

// Không qua trung gian là server
let maxNumberImages = 20;
router.post(
    "/",
    upload.array("files", maxNumberImages),
    uploadControllers.saveToMongoDB,
)

module.exports = router;
