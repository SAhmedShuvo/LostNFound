const Item= require("../models/item.model");
const Claim= require("../models/claims.model");
const User= require("../models/user.model");
const Notification= require("../models/notification.model");
const transporter= require("../utils/mailer");
const itemStatusTemplate = require("../utils/itemStatusTemplate");
const claimerTemplate= require("../utils/claimerTemplate");
const postedUserTemplate= require("../utils/postedUserTemplate");

const showPendingItems = async(req, res)=>{
    try{
        const items= await Item.find({isVerified: false}).populate("postedBy", "name email");
        res.status(200).json(items);
    }
    catch(err){
        res.status(401).send({message: err.message, });
    }
}
const approveItem = async (req, res) => {
    try {
      const { id } = req.params;
  
      const item = await Item.findById(id).populate("postedBy", "_id name email");;
  
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
  
      if (item.isVerified) {
        return res.status(400).json({
          message: `Item cannot be approved.`,
        });
      }
      item.isVerified = true;
  
      await item.save();

      await transporter.sendMail({
        from: `"Lost & Found" <${process.env.EMAIL_USER}>`,
        to: item.postedBy.email,
        subject: "Item Approved",
        html: itemStatusTemplate(
          item.postedBy.name,
          item.itemName,
          "approved"
        ),
      });
      await Notification.create({
        user: item.postedBy._id,
        title: "Item Approved",
        message: `Your item "${item.itemName}" has been approved by admin.`,
        type: "item",
      });
  
      res.status(200).json({
        message: "Item approved successfully",
        item,
      });
    } catch (err) {
      res.status(500).json({
        message: "Failed to approve item",
        error: err.message,
      });
    }
  };
const rejectItem = async (req, res) => {
    try{
        const {id}=req.params;
        const item= await Item.findById(id).populate("postedBy", "_id, name, email");
        if(!item){
            return res.status(404).json({message: "Item not found"});
        }
        if (item.status !== "pending") {
            return res.status(400).json({
              message: `Item cannot be rejected. Current status: ${item.status}`,
            });
        }
        await Item.deleteOne({ _id: id });
        await transporter.sendMail({
            from: `"Lost & Found" <${process.env.EMAIL_USER}>`,
            to: item.postedBy.email,
            subject: "Item Rejected",
            html: itemStatusTemplate(
              item.postedBy.name,
              item.itemName,
              "rejected"
            ),
          });
          await Notification.create({
            user: item.postedBy._id,
            title: "Item Rejected",
            message: `Your request for "${item.itemName}" has been rejected by admin.`,
            type: "item",
          });  
        res.status(200).json({message: "Item rejected successfully", item});
    }
    catch(err){
        res.status(401).send({message: err.message, });
    }
}

const getAllItems = async (req, res) => {
    try{
        const items= await Item.find().populate("postedBy", "name email");
        if(!items){
            return res.status(404).json({message: "No items found"}); 
        }
        res.status(200).json(items);
    }
    catch(err){
        res.status(401).send({message: err.message, });
    }
}

const pendingClaims = async (req, res) => {
    try{
        const claims= await Claim.find({status: "pending"})
        .populate("claimedBy", "name email")
        .populate({
            path: "itemId",
            select:"itemName location date type photos description status postedBy",
            populate:{
                path: "postedBy",
                select: "name email"
            }
        });
        if(!claims){
            return res.status(404).json({message: "No pending claims found"});
        }
        res.status(200).json(claims);
    }
    catch(err){
        res.status(401).send({message: err.message, });
    }
}

const approveClaim = async (req, res) => {
    try{
        const {id}= req.params;
        const claim = await Claim.findById(id)
  .populate("claimedBy", "name email")
  .populate({
    path: "itemId",
    select: "itemName postedBy status phone",
    populate: { path: "postedBy", select: "name email" }
  });

        if(!claim){
            return res.status(404).json({message: "Claim not found"});
        }
        if(claim.status !== "pending"){
            return res.status(400).json({message: "Claim cannot be approved"});
        }
        claim.status = "approved";
        claim.reviewedAt = new Date();
        await claim.save();
        claim.itemId.status = "claimed";
        await claim.itemId.save();
        

        await transporter.sendMail({
            from: `"Lost & Found" <${process.env.EMAIL_USER}>`,
            to: claim.claimedBy.email,
            subject: "Your Claim Has Been Approved",
            html:claimerTemplate(
              claim.claimedBy.name,
              claim.itemId.itemName, 
              {
                name: claim.itemId.postedBy.name,
                email: claim.itemId.postedBy.email,
                phone: claim.itemId.phone,
              }
            ),
          });

          await transporter.sendMail({
            from: `"Lost & Found" <${process.env.EMAIL_USER}>`,
            to: claim.itemId.postedBy.email,
            subject: "Your Item Has Been Claimed",
            html: postedUserTemplate(
              claim.itemId.postedBy.name,
              claim.itemId.itemName,
              {
                name: claim.claimedBy.name,
                email: claim.claimedBy.email,
              }
            ),
          });
          await Notification.create({
            user: claim.itemId.postedBy._id,
            title: "Item Claimed",
            message: `Your item "${claim.itemId.itemName}" has been claimed by a user.
          Please contact with "${claim.claimedBy.name}". Email: "${claim.claimedBy.email}" .  Contact: "${claim.itemId.phone}"`,
            type: "claim",
          });
          
          await Notification.create({
            user: claim.claimedBy._id,
            title: "Item Claim Approved",
            message: `Your claim for "${claim.itemId.itemName}" has been approved by admin.
          Please contact the user who posted the item: "${claim.itemId.postedBy.name}". Email: "${claim.itemId.postedBy.email}"`,
            type: "claim",
          });
          
        res.status(200).json({message: "Claim approved successfully", claim});
    }


    catch (err)
    {
        res.status(500).send({message: err.message, });
    }
}
const rejectClaim = async (req, res) => {
    try {
      const { id } = req.params;
  
      const claim = await Claim.findById(id)
        .populate("claimedBy", "name email")
        .populate({
          path: "itemId",
          select: "itemName postedBy phone",
          populate: { path: "postedBy", select: "name email" }
        });
  
      if (!claim) {
        return res.status(404).json({ message: "Claim not found" });
      }
  
      if (claim.status !== "pending") {
        return res.status(400).json({ message: "Claim cannot be rejected" });
      }
  
      claim.status = "rejected";
      claim.reviewedAt = new Date();
      await claim.save();
  
      await transporter.sendMail({
        from: `"Lost & Found" <${process.env.EMAIL_USER}>`,
        to: claim.claimedBy.email,
        subject: "Your Claim Has Been Rejected",
        html: `
          <p>Hello ${claim.claimedBy.name},</p>
          <p>Your claim for the item "${claim.itemId.itemName}" has been <b>rejected</b> by the admin.</p>
          
        `,
      });
  
      await Notification.create({
        user: claim.claimedBy._id,
        title: "Claim Rejected",
        message: `Your claim for "${claim.itemId.itemName}" has been rejected by admin. 
  Please contact the user who posted the item: "${claim.itemId.postedBy.name}", Email: "${claim.itemId.postedBy.email}"`,
        type: "claim",
      });
  
      res.status(200).json({ message: "Claim rejected successfully", claim });
  
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  
const getStats = async (req, res) => {
    try {
      const [
        totalUsers,
        verifiedUsers,
        totalAdmins,
  
        totalItems,
        pendingItems,
        approvedItems,
        claimedItems,
        returnedItems,
  
        totalClaims,
        pendingClaims,
        approvedClaims,
        rejectedClaims,
      ] = await Promise.all([
        User.countDocuments(),
        User.countDocuments({ isVerified: true }),
        User.countDocuments({ role: "admin" }),
  
        Item.countDocuments(),
        Item.countDocuments({ status: "pending" }),
        Item.countDocuments({ status: "approved" }),
        Item.countDocuments({ status: "claimed" }),
        Item.countDocuments({ status: "returned" }),
  
        Claim.countDocuments(),
        Claim.countDocuments({ status: "pending" }),
        Claim.countDocuments({ status: "approved" }),
        Claim.countDocuments({ status: "rejected" }),
      ]);
  
      res.status(200).json({
        success: true,
        users: {
          total: totalUsers,
          verified: verifiedUsers,
          admins: totalAdmins,
        },
        items: {
          total: totalItems,
          pending: pendingItems,
          approved: approvedItems,
          claimed: claimedItems,
          returned: returnedItems,
        },
        claims: {
          total: totalClaims,
          pending: pendingClaims,
          approved: approvedClaims,
          rejected: rejectedClaims,
        },
      });
    } catch (err) {
      res.status(500).json({
        message: "Failed to fetch admin statistics",
        error: err.message,
      });
    }
  };

const searchUser = async (req, res) => {
  const { query } = req.body;

  try {
     const user = await User.findOne({ email: query });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchClaimById = async (req, res) => {
  const { id } = req.params;

  try {
    const claim = await Claim.findById(id)
      .populate("itemId")
      .populate("claimedBy", "name email")
      .populate("postedBy", "name email");

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    res.status(200).json(claim); // ✅ no extra object wrapper
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


const adminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const verifiedUsers = await User.countDocuments({ isVerified: true });
    const totalItems = await Item.countDocuments();
    const pendingItems = await Item.countDocuments({ status: 'pending' });
    const returnedItems = await Item.countDocuments({ status: 'returned' });
    const totalClaims = await Claim.countDocuments();
    const pendingClaims = await Claim.countDocuments({ status: 'pending' });

    const recentItems = await Item.find()
      .sort({ createdAt: -1 })
      .limit(5); 

    const recentClaims = await Claim.find()
      .populate('itemId', 'itemName') 
      .populate('claimedBy', 'name')  
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      users: { total: totalUsers, verified: verifiedUsers },
      items: { total: totalItems, pending: pendingItems, returned: returnedItems },
      claims: { total: totalClaims, pending: pendingClaims },
      recentItems,   
      recentClaims   
    });
  } catch (err) {
    res.status(500).json({ message: err?.message || "Failed to fetch dashboard" });
  }
};
const deleteItem = async (req, res) => {
    try{
        const {id}=req.params;
        const item= await Item.findById(id).populate("postedBy", "_id, name, email");
        if(!item){
            return res.status(404).json({message: "Item not found"});
        }
        if (item.status !== "pending") {
            return res.status(400).json({
              message: `Item cannot be rejected. Current status: ${item.status}`,
            });
        }
        item.isVerified = false;
        await item.save(); 
        res.status(200).json({message: "Item deleted successfully", item});
    }
    catch(err){
        res.status(401).send({message: err.message, });
    }
}


module.exports={showPendingItems,  approveItem, rejectItem, getAllItems, pendingClaims,
   approveClaim, getStats, rejectClaim, searchUser, searchClaimById, adminDashboard, deleteItem};