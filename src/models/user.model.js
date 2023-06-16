const mongoose = require("mongoose");

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
    default: "CUSTOMER",
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

const Users = mongoose.model("User", userSchema);

module.exports = Users;
