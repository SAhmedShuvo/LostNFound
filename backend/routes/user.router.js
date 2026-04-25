const express = require("express");
const userRouter = express.Router();
const User= require("../models/user.model")
const {register, verifyOTP, resendOTP, login, allUsers, forgotPassword, resetPassword} = require("../controllers/auth.controller");
const {myClaim, myMessage, myItems, myProfile, setAvatar,}= require("../controllers/user.controller");
const { checkAuthentication, checkAdmin, restrictAdmin} = require("../middlewares/check-auth");
const { upload, uploadAvatar } = require("../middlewares/multer");

userRouter.post("/register", register);
userRouter.post("/register/resendOTP", resendOTP);
userRouter.post("/register/verifyOTP", verifyOTP);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.post("/resetPassword", resetPassword);
userRouter.post("/login", login);
userRouter.get("/myClaims" , checkAuthentication, myClaim);
userRouter.get("/all", checkAuthentication, checkAdmin, allUsers);
userRouter.get("/myMessage", checkAuthentication, myMessage);
userRouter.get("/myItems", checkAuthentication, restrictAdmin, myItems);

userRouter.get("/myProfile", checkAuthentication, myProfile);
userRouter.get("/profile", checkAuthentication, myProfile);
userRouter.post("/setAvatar", checkAuthentication, uploadAvatar.single("avatar"), setAvatar);
module.exports= userRouter;