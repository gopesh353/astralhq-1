const { Router } = require("express");
const aiController = require("./ai.controller");
const { requireAuth } = require("../../middleware");

const router = Router();

router.use(requireAuth);

router.get("/insights", aiController.getInsights);
router.post("/insights/generate", aiController.generateInsights);

module.exports = router;
