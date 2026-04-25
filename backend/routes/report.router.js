const express = require("express");
const { checkAuthentication } = require("../middlewares/check-auth");
const { reportLostItem, reportFoundItem, createClaim } = require("../controllers/report.controller");
const upload = require("../middlewares/multer");
const reportRouter = express.Router();

reportRouter.post("/lostItem", checkAuthentication, upload.single("photos"), reportLostItem);
reportRouter.post("/foundItem", checkAuthentication, upload.single("photos"), reportFoundItem);
reportRouter.post("/claimItem/:itemId", checkAuthentication, upload.array("proofImages", 3), createClaim);

module.exports=reportRouter;