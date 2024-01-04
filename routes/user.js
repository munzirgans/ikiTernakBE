const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.use(require("../middleware/auth"));

router.get("/", userController.getUsers);
// router.get("/:id", userController.getUser);
router.put("/", userController.updateUser);
router.post("/changepassword", userController.changePassword);

module.exports = router;