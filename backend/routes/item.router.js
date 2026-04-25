const express = require("express");
const { checkAuthentication } = require("../middlewares/check-auth");
const { showItem, showMyItem,itemSearch, showItemDetails, deleteItem, itemStats} = require("../controllers/item.controller");
const itemRouter = express.Router();

itemRouter.get("/all", showItem);
itemRouter.get("/my", checkAuthentication, showMyItem);
itemRouter.get("/details/:id",checkAuthentication, showItemDetails);
itemRouter.get("/delete/:id", checkAuthentication, deleteItem);
itemRouter.get("/stats", itemStats);
itemRouter.post("/search", itemSearch);

module.exports=itemRouter;

