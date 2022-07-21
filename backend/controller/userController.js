const tryCatch = require("../middleware/tryCatch");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendemail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Register User
exports.registerUser = tryCatch(async (req, res, next) => {
  console.log(req.body);
  const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "ShopIFy",
    width: 150,
    crop: "scale",
  });
  const { name, email, password, address } = req.body;
  
  const user = await userModel.create({
    name,
    email,
    password,
    address,
    avatar: {
      pic_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });
  sendToken(user, 201, res);
});

// Login User
exports.loginUser = tryCatch(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter login Details", 401));
  }

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Please enter correct user details", 401));
  }

  const matchPassword = await user.comparePassword(password);

  if (!matchPassword) {
    return next(new ErrorHandler("Please enter correct pass details", 401));
  }

  sendToken(user, 201, res);
});

// Logout
exports.logout = tryCatch(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});

// Forgot Password
exports.forgotpassword = tryCatch(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 401));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`

  const message = `This is auto-generated mail for your password recovery . If you have not requested for reset password then please ignore it . Otherwise \n\nclick here ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Reset Your Password",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Reset Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetpasswordtoken = undefined;
    user.resetpasswordexpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = tryCatch(async (req, res, next) => {
  const resetpasswordtoken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await userModel.findOne({
    resetpasswordtoken: resetpasswordtoken,
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Pasword token is invalid or has been expired , Try Again !",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmpassword) {
    return next(
      new ErrorHandler("Password and confirmpassword not matched !", 400)
    );
  }
  if (req.body.password.length <= 6 ) {
    return next(
      new ErrorHandler("Password Must contain greater than 6 character")
    )
  }
  user.password = req.body.password;
  user.resetpasswordtoken = undefined;
  user.resetpasswordexpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get User Details
exports.getUserDetail = tryCatch(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Password
exports.updatePassword = tryCatch(async (req, res, next) => {
  const user = await userModel.findById(req.user.id).select("+password");

  const oldPasswordVerify = await user.comparePassword(req.body.oldPassword);

  if (!oldPasswordVerify) {
    return next(new ErrorHandler("Please enter correct old Password", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password and ConfirmPassword not matched", 400)
    );
  }

  if (req.body.newPassword.length <= 6 ) {
    return next(
      new ErrorHandler("Password Must contain greater than 6 character")
    )
  }

  user.password = req.body.newPassword;

  user.save();

  sendToken(user, 200, res);
});

// Update User Profile
exports.updateUserProfile = tryCatch(async (req, res, next) => {
  const newDataUser = {
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
  };

  if (req.body.avatar !== "") {
    console.log(req.body);
    const user = await userModel.findById(req.user.id);

    const imageId = user.avatar.pic_id;

    await cloudinary.v2.uploader.destroy(imageId);
    console.log("hello from updateUserProfile");

    const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "ShopIFy",
      width: 150,
      crop: "scale",
    });

    console.log(" mycloud : " + mycloud);

    newDataUser.avatar = {
      pic_id: mycloud.public_id,
      url: mycloud.secure_url,
    };
  }

  const user = await userModel.findByIdAndUpdate(req.user.id, newDataUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user
  });
});

// Get All Users (ADMIN)
exports.getAllUsers = tryCatch(async (req, res, next) => {
  const users = await userModel.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get One User detail (ADMIN)
exports.getOneUser = tryCatch(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User Not Found", 401));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user role (ADMIN)
exports.updateUserRole = tryCatch(async (req, res, next) => {
  const newDataUser = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await userModel.findByIdAndUpdate(req.params.id, newDataUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete User (ADMIN)
exports.deleteUser = tryCatch(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not Found", 401));
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
