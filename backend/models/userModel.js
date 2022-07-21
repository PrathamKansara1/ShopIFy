const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name .."],
    maxlength: [20, "Your name length reached at max"],
    minlength: [2, "Your name can't be too short"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email .."],
    unique: true,
    validate: [validator.isEmail, "Please Enter vaid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password.."],
    minlength: [6, "Password must be 6 character long .."],
    select: false,
  },
  address: {
    type: String,
    required: [true, "Please enter whole Address .."],
  },
  avatar: {
    pic_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetpasswordtoken: String,
  resetpasswordexpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getJWTTOKEN = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetpasswordtoken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetpasswordexpire = Date.now() + 20 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("user", userSchema);
