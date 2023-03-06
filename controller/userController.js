const User = require("../models/User");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const mailHelper = require("../utils/emailHelper");
const crypto = require('crypto');

// sign up controller
exports.signup = async (req, res, next) => {
  try {
    let result;
    if (!req.files) {
      return next("photo is required for signup");
    }
    let file = req.files.photo;
    result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "users",
      width: 150,
      crop: "scale",
    });
    const { name, email, password } = req.body;
    if (!email) {
      return next(new CustomError("Please send email", 400));
    }
    if (!(email || name || password)) {
      return next("Name, Email and password are required", 400);
    }
    const user = await User.create({
      name,
      email,
      password,
      photo: {
        id: result.public_id,
        secure_url: result.secure_url,
      },
    });
    cookieToken(user, res);
  } catch (error) {
    console.log(error);
  }
};

// login controller
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new CustomError("please provide email and password"));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new CustomError("You are not register in this app", 400));
    }
    const isPasswordCorrect = await user.isValidatedPassword(password);

    if (!isPasswordCorrect) {
      return next(new CustomError("Your password is incorrect", 400));
    }

    cookieToken(user, res);
  } catch (error) {
    console.log(error);
  }
};

// logout controller
exports.logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

// forgot password controller
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError("Email not found", 400));
  }
  const forgotToken = await user.getForgotPasswordToken();

  await user.save({ validateBeforeSave: false });
  const myurl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${forgotToken}`;
  const message = `Copy and paste this link to your URL and hit enter \n\n ${myurl}`;
  try {
    await mailHelper({
      email: user.email,
      subject: "LCO TStore - Password reset email",
      message,
    });
    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(200).json({error :error.message});
  }
};

// password reset 
exports.passwordReset = async (req,res,next) =>{
  try {
    const token = req.params.token
    const encryToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({encryToken,forgotPasswordExpiry:{$gt:Date.now()}})
    if(!user){
      return next(new CustomError('Token is invalid or expired'));
    }
    if(req.body.password !== req.body.confirmPassword ){
      return next(new CustomError('password and confirm password do not match',400))
    }
    user.password = req.body.password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return next(new CustomError('Some thing went to wrong',500))
  }
}

// get logged in use details 
exports.getloggedIsUserDetails = async (req,res,next) =>{
 try {
  const user =  await User.findById(req.userdetails.id);
  res.status(200).json({
    success:true,
    user
  })
 } catch (error) {
   return next(new CustomError(error,500))
 }
}

// change password
exports.changePassword = async (req,res,next) =>{
try {
  const userId = req.userdetails.id 
  const user = await User.findById(userId).select("+password");
  const IsCorrectOldpassword = await user.isValidatedPassword(req.body.oldPassword)
  if(!IsCorrectOldpassword){
    return next(new CustomError('old password is incorrect',400))
  }
  user.password = req.body.password;
  await user.save();
  cookieToken(user,res);
} catch (error) {
  return next(new CustomError(error,500))
}

}

// update user
exports.updateuserDetails = async (req,res,next) =>{
  try {
    const newData = {
      name:req.body.name,
      email: req.body.email
    }
  
    console.log(req.files);
    if(req.files !== undefined){
      const user = await User.findById(req.userdetails.id)
      const imageId = user.photo.id;
      const resp = await cloudinary.uploader.destroy(imageId);
      const result = await cloudinary.uploader.upload(req.files.photo.tempFilePath, {
        folder: "users",
        width: 150,
        crop: "scale",
      });
  
      newData.photo = {
        id:result.public_id,
        secure_url: result.secure_url
      }
  
    }
    const user = await User.findByIdAndUpdate(req.userdetails.id,newData, {
      new: true,
      runValidators: true,
      useFindAndModify:false,
    })
    res.status(200).json({
      success :true,
    })
  } catch (error) {
    return next(new CustomError(error,500))
  }
}

//  admin get one user
exports.admingetOneUser = async (req,res,next) =>{
  const user = await User.findById(req.params.id);
  if(!user){
    return next(new CustomError('no user found',400));
  }
  res.status(200).json({
    success: true,
    user
  })
}

// admin update one user 
exports.adminUpdateOneUserDetails = async (req,res,next) =>{
  try {
    const newData = {
      name:req.body.name,
      email: req.body.email,
      role:req.body.role
    }
  
    if(req.files !== undefined){
      const user = await User.findById(req.params.id)
      const imageId = user.photo.id;
      await cloudinary.uploader.destroy(imageId);
      const result = await cloudinary.uploader.upload(req.files.photo.tempFilePath, {
        folder: "users",
        width: 150,
        crop: "scale",
      });
  
      newData.photo = {
        id:result.public_id,
        secure_url: result.secure_url
      }
  
    }
    const user = await User.findByIdAndUpdate(req.params.id,newData, {
      new: true,
      runValidators: true,
      useFindAndModify:false,
    })
    res.status(200).json({
      success :true,
      user
    })
  } catch (error) {
    return next(new CustomError(error,500))
  }
}

// admin delete one user 
exports.adminDeleteOneUser = async (req,res,next) =>{
  try {
    const id = req.params.id;
    if(!id){
      return next(new CustomError(" Id not Found",500))
    }
    const user = await User.findById(id);
    if(!user){
      return next(new CustomError(" User not Found",500))
    }
    const imageId = user.photo.id;
    await cloudinary.uploader.destroy(imageId);
    await user.delete();
    res.status(201).json({
      success:true,
      message:'User Deleted Successfully'
    })
  } catch (error) {
    return next(new CustomError(error,500))
  }
}

// manager get all user  
exports.managerAllUser = async (req,res,next) =>{
 try {
  const users = await User.find()

  res.status(200).json({
    success : true,
    users
  })
 } catch (error) {
  return next(new CustomError(error,500))
 }
} 



