const express = require("express")
const router = express.Router();
const diaryternakController = require("../controllers/diaryternakController");

router.use(require("../middleware/auth"));

router.get("/diary", diaryternakController.getDiaryTernak);
router.post("/diary", diaryternakController.createDiaryTernak);

router.get("/dompet", diaryternakController.getDompetTernak);
router.post("/dompet", diaryternakController.createDompetTernak);


module.exports = router;