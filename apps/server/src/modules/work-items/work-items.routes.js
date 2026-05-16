const { Router } = require("express");
const { authenticate } = require("../../middleware/auth.middleware");
const { authorizeRoles } = require("../../middleware");
const controller = require("./work-items.controller");

const router = Router();

router.use(authenticate);
router.get("/", authorizeRoles("QUALITY_REVIEWER", "PROJECT_LEAD", "ADMIN"), controller.list);
router.patch("/:id/review", authorizeRoles("QUALITY_REVIEWER", "PROJECT_LEAD", "ADMIN"), controller.review);

module.exports = router;
