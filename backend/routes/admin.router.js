const express = require("express");
const { checkAuthentication, checkAdmin } = require("../middlewares/check-auth");
const adminRouter = express.Router();
const { showPendingItems, approveItem, searchUser, rejectItem, getAllItems,
    searchClaimById, pendingClaims, getStats, approveClaim, rejectClaim, adminDashboard, 
    deleteItem} = require("../controllers/admin.controller");

adminRouter.get("/pendingItems", checkAuthentication, checkAdmin, showPendingItems);
adminRouter.post("/approveItem/:id", checkAuthentication, checkAdmin, approveItem);
adminRouter.post("/rejectItem/:id", checkAuthentication, checkAdmin, rejectItem);
adminRouter.get("/getAllItems", checkAuthentication, checkAdmin, getAllItems);
adminRouter.get("/pendingClaims", checkAuthentication, checkAdmin, pendingClaims);
adminRouter.get("/dashboard", checkAuthentication, checkAdmin, getStats);
adminRouter.post("/approveClaim/:id", checkAuthentication, checkAdmin, approveClaim);
adminRouter.post("/rejectClaim/:id", checkAuthentication, checkAdmin, rejectClaim);
adminRouter.post("/search", checkAuthentication, checkAdmin, searchUser);
adminRouter.get("/claim/:id", checkAuthentication, checkAdmin, searchClaimById);
adminRouter.post("/deleteItem/:id", checkAuthentication, checkAdmin, deleteItem);
adminRouter.get("/dashboard", checkAuthentication, checkAdmin, adminDashboard);


module.exports=adminRouter;