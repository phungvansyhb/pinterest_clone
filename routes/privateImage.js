const router = require("express").Router();
const privateImageControllers = require("../controllers/privateImageControllers")

router.get("/by-name", privateImageControllers.filterByName); // Idolplus.info/k16/by-name?name=''
router.get("/:category", privateImageControllers.filterByCategory); // Idolplus.info/k16/oversensitive
router.get("/", privateImageControllers.getAll); // Idolplus.info/k16

module.exports = router;
