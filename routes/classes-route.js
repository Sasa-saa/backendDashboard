const express = require("express");
const router = express.Router();
const classesController = require("./controllers/classes.controller");

router.post("/classes", classesController.createClass);
router.get("/classes", classesController.getAllClasses);
router.get("/classes/:id", classesController.getClassById);
router.put("/classes/:id", classesController.updateClass);
router.delete("/classes/:id", classesController.deleteClass);

module.exports = router;
