// const express = require("express");
// const router = express.Router();
// const statsController = require("../controllers/stats.controller");

// // CREATE
// router.post("/", statsController.createStats);

// // READ all
// router.get("/", statsController.getAllStats);

// // READ one by ID
// router.get("/:id", statsController.getStatsById);

// // UPDATE by ID
// router.put("/:id", statsController.updateStats);

// // DELETE by ID
// router.delete("/:id", statsController.deleteStats);

// // in routes/stats-route.js
// router.get("/latest", statsController.getAllStats);

// module.exports = router;




const express = require("express");
const router = express.Router();
const statsController = require("../controllers/stats.controller");

// CREATE
router.post("/", statsController.createStats);

// READ all (latest)
router.get("/", statsController.getAllStats);

// READ latest explicitly
router.get("/latest", statsController.getAllStats);

// READ one by ID
router.get("/:id", statsController.getStatsById);

// UPDATE by ID
router.put("/:id", statsController.updateStats);

// DELETE by ID
router.delete("/:id", statsController.deleteStats);

module.exports = router;