const mongoose= require("mongoose");
const bcryptjs= require("bcryptjs");
const userSchema= mongoose.Schema({
    name:{
        type: String, 
        required: true,
        trim: true,
    },
    email:
    {
        type: String, 
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    avatar:
    {
        type: String,
        default: "",
    },
    password:
    {
        type: String, 
        required: true,
        trim: true,
    },
    role:
    {
        type: String,
        enum:["user", "admin"],
        default: "user",
    },
    phone:
    {
        type: String, 
        required: true,
        trim: true,
    },
    otp: {type: String, },
    otpExpiry: {type: Date},
    isVerified: {type: Boolean, default: false},

},
{
    timestamps: true,
});


userSchema.statics.isEmailTaken= async function(email){
    const user=await this.findOne({email});

    return !!user;
}
// Check if password matched or not (instance-level helper)
userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;

    return bcryptjs.compare(password, user.password);
};
// userSchema.pre("save", async function(next) {
//     const user= this;
//     user.password= await bcryptjs.hash(user.password, 8);
    
// })

const User= mongoose.model("User", userSchema);
module.exports= User;