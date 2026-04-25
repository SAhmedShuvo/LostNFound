const User= require("../models/user.model");
const { generateToken } = require("../utils/jwttoken");
const transporter = require("../utils/mailer");
const { generateOTP } = require("../utils/otp");
const otpEmailTemplate = require("../utils/otpEmailTemplate");
const bcryptjs = require("bcryptjs");
const moment= require("moment");

const register= async (req, res)=>
{

   const userBody= req.body;
   console.log(userBody);
   try{
      
      if(await User.isEmailTaken(userBody.email))
      {
         return res.status(400).send({
            message:"email already taken",
         });
      }
      console.log("ok");
      const otp = generateOTP();
      const hashedPassword = await bcryptjs.hash(userBody.password, 10);
      const newUser=await User.create({
         name: userBody.fullName,
         email: userBody.email,
         password: hashedPassword,
         phone: userBody.phone,
         otp,
         otpExpiry: Date.now() + 10 * 60 * 1000,
      });
      console.log(process.env.EMAIL_USER);

      await transporter.sendMail({
      from: `"Lost & Found" <${process.env.EMAIL_USER}>`,
      to: userBody.email,
      subject: "Verify Your Email - OTP",
      html: otpEmailTemplate(userBody.name, otp),
    });
      res.status(200).send({
         message:"Registered successfully. Please verify OTP.",
         data: {
            name:userBody.name,
            email: userBody.email,
         }, 
      });


   }
   catch(error){
     console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Registration failed",
      });
   }
};

const verifyOTP= async (req, res)=>
{
    const {otp, email}= req.body;
    try{
        const newUser= await User.findOne({email});
    if(!newUser)
    {
        return res.status(404).json({
            message:"user not found",
        });
    }
    if(newUser.isVerified)
    {
        return res.status(400).json({
            message: "user already verified",
        });
    }
        if (!newUser.otp || newUser.otpExpiry < Date.now()) {
       return res.status(400).json({
        message: "OTP expired. Please resend OTP",
      });
    }

    if (newUser.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    newUser.isVerified= true;
    newUser.otp= undefined;
    newUser.otpExpiry= undefined;

    await newUser.save();

    res.json({
        message:"email verification successful",
    });
    }

    catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    res.status(500).json({
      message: "OTP verification failed",
    });
  }



}

const resendOTP = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found or invalid email" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "Email is already verified" });
        }

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;

        await user.save();

        await transporter.sendMail({
            from: `"Lost & Found" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Verify Your Email - OTP",
            html: otpEmailTemplate(user.name, otp),
        });

        res.status(200).json({
            message: "OTP resent successfully. Please verify your email.",
            data: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Resend OTP Error:", error);
        res.status(500).json({ message: "Resend OTP failed" });
    }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        message: "account doesn't exist"
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify your email first"
      });
    }

    const otp = generateOTP();
    const hashedOtp = await bcryptjs.hash(otp, 10);

    user.otp = hashedOtp;
    user.otpExpiry = Date.now() + 2 * 60 * 1000; 

    await user.save();

    await transporter.sendMail({
      from: `"Lost & Found" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Password OTP (Valid 2 Minutes)",
      html: otpEmailTemplate(user.name, otp),
    });

    res.json({
      message: "If account exists, OTP sent"
    });

  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    res.status(500).json({
      message: "Failed to send OTP"
    });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: "OTP expired or invalid"
      });
    }

    const isMatch = await bcryptjs.compare(otp, user.otp);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    user.password = await bcryptjs.hash(newPassword, 10);
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    res.json({
      message: "Password reset successful"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Reset failed"
    });
  }
};



const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // check credentials
        if (!user || !(await user.isPasswordMatch(password))) {
            return res
                .status(401)
                .send({ message: "Incorrect email or password!" });
        }


        const tokenExpire=moment().add(process.env.JWT_ACCESS_EXPIRATION, "minute");

        const accessToken= await generateToken(user._id, user.role, tokenExpire, "access");

    res.send({
    message: "Login successful!",
    data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        access: {
            token: accessToken,
            expires: tokenExpire.toDate(),
            expiresIn: process.env.JWT_ACCESS_EXPIRATION * 60,
        },
    },
    });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const allUsers= async (req, res)=>
{
    try{
        // Find all users and exclude sensitive fields (password, otp, otpExpiry)
        const data= await User.find({isVerified: true});
        res.status(200).json({
            message: "Users retrieved successfully",
            data: data
        });
    }
    catch(err)
    {
        return res.status(500).json({message: err.message});
    }
}



module.exports={register, verifyOTP, resendOTP, allUsers, login, forgotPassword, resetPassword};