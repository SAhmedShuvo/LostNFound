const Item = require("../models/item.model");
const Claim = require("../models/claims.model");
const Inbox = require("../models/notification.model");
const User = require("../models/user.model");
const cloudinary = require("../config/cloudinary");
const myClaim = async (req, res) => {
  try {
    const userId = req.user?.sub;
    if (!userId) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const claims = await Claim.find({ claimedBy: userId })
    .populate( "postedBy", "name email" )
    .populate("itemId", "itemName type description photos")
    .sort({
      createdAt: -1,
    });
    res.status(200).json(claims);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};



const myMessage = async (req, res) => {
  try {
    const userId = req.user?.sub;

    if (!userId) {
      return res.status(401).json({ message: "unauthorized" });
    }


    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalMessages = await Inbox.countDocuments({ user: userId });

    const messages = await Inbox.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      messages,
      currentPage: page,
      totalPages: Math.ceil(totalMessages / limit),
      totalMessages,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const myItems = async (req, res) => {
  try {
    const userId = req.user?.sub;
    if (!userId) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const myItems = await Item.find({ postedBy: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(myItems);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const setAvatar = async (req, res) => {
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ message: "No file uploaded. Use form field name 'avatar'." });
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "avatars" },
      async (err, result) => {
        if (err) {
          console.error("Cloudinary upload error:", err);
          res.status(500).json({ message: err?.message || "Error uploading image" });
          return resolve();
        }
        try {
          const imageUrl = result.secure_url;
          await User.findByIdAndUpdate(req.user.sub, { avatar: imageUrl });
          res.json({ success: true, message: "Avatar updated", imageUrl });
        } catch (dbErr) {
          console.error(dbErr);
          res.status(500).json({ message: "Error saving avatar" });
        }
        resolve();
      }
    );
    uploadStream.end(req.file.buffer);
  });
};


const myProfile = async (req, res) => {
  try {
    const userId = req.user?.sub;
    if (!userId) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const userInfo = await User.findById(userId).select(
      "name email role createdAt avatar"
    );

    const myLost = await Item.countDocuments({ postedBy: userId, type: "lost" });
    const myFound = await Item.countDocuments({ postedBy: userId, type: "found" });
    const mySolved = await Item.countDocuments({
      postedBy: userId,
      status: "solved",
    });

    const recentItems = await Item.find({ postedBy: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("itemName type createdAt");

    const recentClaims = await Claim.find({ claimedBy: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("itemId", "itemName")
      .select("createdAt");

    // 🔥 Merge activities
    const activities = [];

    recentItems.forEach((item) => {
      activities.push({
        activityType: item.type === "lost" ? "Lost Item" : "Found Item",
        title: item.itemName,
        date: item.createdAt,
      });
    });

    recentClaims.forEach((claim) => {
      activities.push({
        activityType: "Claim",
        title: claim.itemId?.itemName,
        date: claim.createdAt,
      });
    });

    // Sort latest first
    activities.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Only 5 recent
    const recentActivity = activities.slice(0, 5);

    res.status(200).json({
      user: userInfo,
      stats: {
        lost: myLost,
        found: myFound,
        solved: mySolved,
      },
      recentActivity,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


module.exports = { myClaim, myMessage, myItems, myProfile, setAvatar };