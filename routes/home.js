const router = require("express").Router();
const homeControllers = require("../controllers/homeControllers");

router.get(
    "/",
    homeControllers.getImages
);

module.exports = router;
