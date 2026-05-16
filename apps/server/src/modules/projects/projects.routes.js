const { Router } = require("express");
const projectsController = require("./projects.controller");
const { authenticate } = require("../../middleware");

const router = Router();
router.use(authenticate);
router.get("/", projectsController.list);
router.post("/request", projectsController.request);
router.post("/:id/flag", projectsController.flag);

module.exports = router;
