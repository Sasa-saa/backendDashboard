// const express = require("express");
// const router = express.Router();
// const classesController = require("../controllers/classes.controller");

// router.post("/classes", classesController.createClass);
// router.get("/classes", classesController.getAllClasses);
// router.get("/classes/:id", classesController.getClassById);
// router.put("/classes/:id", classesController.updateClass);
// router.delete("/classes/:id", classesController.deleteClass);

// module.exports = router;


const express = require("express");
const router = express.Router();
const classesController = require("../controllers/classes.controller");

// Remove the extra "/classes" prefix
router.post("/", classesController.createClass);
router.get("/", classesController.getAllClasses);
router.get("/:id", classesController.getClassById);
router.put("/:id", classesController.updateClass);
router.delete("/:id", classesController.deleteClass);

module.exports = router;