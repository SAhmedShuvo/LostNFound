const mongoose= require("mongoose");
const itemSchema= mongoose.Schema({
    itemName:
    {
        type: String,
        required: true,
        trim: true,
    },
    category:
    {
        type: String,
        required: true,
        trim: true,
    },
    location:
    {
        type: String, 
        required: true,
        trim: true,
    },
    phone:
    {
        type: String, 
        required: true,
        trim: true,
    },
    date:
    {
        type: Date,
        required: true,
    },
    type:
    {
        type: String, 
        required: true,
        enum: ["lost", "found"],
    },
    status:
    {
        type: String,
        enum: ["pending", "claimed"],
        default: "pending",
    },
    isVerified: {
    type: Boolean,
    default: false,
    },
    photos:
    [
        {
            type:String,
        },

    ],
    description:
    {
        type: String,
        trim: true,
    },
    postedBy:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }

},
{
    timestamps: true,
});
const Item= mongoose.model("Item", itemSchema);

module.exports= Item;
