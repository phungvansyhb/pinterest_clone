const router = require("express").Router();
const searchControllers = require("../controllers/searchControllers")

// @route GET api/search?q=
// @desc get images group by key
// @access protected
router.get("/by-name", searchControllers.filterByName);
router.get("/", searchControllers.search);

module.exports = router;
