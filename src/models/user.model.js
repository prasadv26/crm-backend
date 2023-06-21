const mongoose = require("mongoose");
const { userTypes, userStatus } = require("../utils/constants");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    default: userTypes.CUSTOMER,
    enum: Object.values(userTypes),
  },
  userStatus: {
    type: String,
    required: true,
    default: userStatus.APPROVED,
    enum: Object.values(userStatus),
  },
  passwordResetToken: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

const Users = mongoose.model("User", userSchema);

module.exports = Users;
