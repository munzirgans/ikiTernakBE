const express = require("express")
const router = express.Router();

const forumController = require("../controllers/forumternakController");

router.use(require("../middleware/auth"));

router.get("/", forumController.getForum);
router.post("/", forumController.createForum);


module.exports = router;
