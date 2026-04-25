const Item= require("../models/item.model");
const showItem = async (req, res) => {
  try {
    const filter = { isVerified: true }; 

    const limit = 10;
    const page = parseInt(req.query.page) || 1;

    const totalItems = await Item.countDocuments(filter);

    const items = await Item.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      items,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message }); // also fix status
  }
};
const itemSearch = async(req, res)=>{
    const {id}= req.body;
    console.log(id);
    console.log("hello");
    try{
      const itm= await Item.findById(id);
      res.status(200).json(itm);
    }
    catch(error){
        res.status(401).send({message: error.message,},);
    }
}

const showMyItem= async(req, res)=>{
    console.log(req.user);
    try{
        const userId= req.user.sub;

        const myItems = await Item.find({ postedBy: userId });
        res.status(200).json(myItems);
    }
    catch(error)
    {
        res.status(401).json({
            message: error.message,
        })
    }
}
const showItemDetails = async(req, res)=>{

    try{
        const { id } = req.params;

        const item = await Item.findById(id).populate("postedBy", "name email");

        if (!item) {
            return res.status(404).json({
                message: "Item not found",
            });
        }

        res.status(200).json(item);
    }
    catch(error){
        res.status(401).send({message: error.message,},);
    }
}

const deleteItem = async (req, res) => {
  try {
    const userId = req.user.sub;        // from JWT
    const { itemId } = req.params;

    // 1. Find the item
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    // 2. Authorization check
    if (item.postedBy.toString() !== userId) {
      return res.status(403).json({
        message: "You are not allowed to delete this item",
      });
    }

    // 3. Optional business rule

    if (item.status === "claimed" || item.status === "returned") {
      return res.status(400).json({
        message: "This item cannot be deleted",
      });
    }


    // 4. Delete
    await Item.findByIdAndDelete(itemId);

    return res.status(200).json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const itemStats = async (req, res) => {
  try {
    const lostItem = await Item.countDocuments({ type: "lost" });
    const foundItem = await Item.countDocuments({ type: "found" });
    const returnedItem = await Item.countDocuments({ status: "accepted"});

    res.status(200).json({
      message: "Item statistics fetched successfully",
      data: {
        lost: lostItem,
        found: foundItem,
        returned: returnedItem,
      },
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};



module.exports={showItem, itemSearch, showMyItem, itemStats, showItemDetails, deleteItem};
