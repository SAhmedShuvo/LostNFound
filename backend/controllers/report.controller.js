const Item = require("../models/item.model");
const Claim = require("../models/claims.model");
const cloudinary = require("../config/cloudinary");

const reportLostItem= async(req, res)=>{
    try{
        const itemInfo= req.body;

        // Process uploaded file if present
        const photos = [];
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            photos.push(result.secure_url);
        }

        const newItem= await Item.create(
            {
                itemName: itemInfo.itemName,
                phone: itemInfo.phoneNumber,
                date: itemInfo.date,
                category: itemInfo.category,
                location: itemInfo.location,
                description: itemInfo.description,
                photos: photos, 
                status: "pending",
                isVerified: false,
                type: "lost",
                postedBy: req.user.sub,
            }
        );
        return res.status(200).json({
            message: "Lost Item added successfully",
            data: newItem,
        });
    }
    catch(error)
    {
        return res.status(500).json({
            message: error.message,
        });
    }
};


const reportFoundItem= async(req, res)=>{
    try{
        const itemInfo= req.body;
        
        // Process uploaded file if present
        const photos = [];
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            photos.push(result.secure_url);
        }

        const newItem= await Item.create(
            {
                itemName: itemInfo.itemName,
                phone: itemInfo.phoneNumber,
                date: itemInfo.date,
                category: itemInfo.category,
                location: itemInfo.location,
                description: itemInfo.description,
                photos: photos, 
                status: "pending",
                isVerified: false,
                type: "found",
                postedBy: req.user.sub,
            }
        );
        return res.status(200).json({
            message: "Found Item added successfully",
            data: newItem,
        });
    }
    catch(error)
    {
        return res.status(500).json({
            message: error.message,
        });
    }
};


const createClaim = async (req, res) => {
  try {
    const { itemId } = req.params;
    // Handle both 'claimText' (from frontend) and 'proofDescription' field names
    const proofDescription = req.body.claimText || req.body.proofDescription;

    if (!proofDescription || !proofDescription.trim()) {
      return res.status(400).json({
        message: "Proof description is required",
      });
    }

    const userId = req.user.sub;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.postedBy.toString() === userId) {
      return res.status(400).json({
        message: "You cannot claim your own item",
      });
    }
    if (item.status!="pending") {
      return res.status(400).json({
        message: "Sorry! This item is already claimed by someone.",
      });
    }

    // Process uploaded files - convert to URLs

    
    const photos = [];
    if (req.files && req.files.length > 0) {
  for (const file of req.files) {
    const result = await cloudinary.uploader.upload(file.path);

    photos.push(result.secure_url); // Cloudinary URL
  }
}

    const claim = await Claim.create({
      itemId: item._id,
      postedBy: item.postedBy,
      claimedBy: userId,
      proofDescription: proofDescription.trim(),
      status: "pending",
      photos,
    });

    return res.status(201).json({
      message: "Claim submitted successfully",
      claim,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


module.exports= {reportLostItem, reportFoundItem, createClaim};