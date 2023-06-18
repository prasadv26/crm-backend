const Users = require("../models/user.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal server error" });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.params.id });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal server error" });
  }
};
const updateUserById = async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.params.id });
    if (req.body.status) {
      user.userStatus = req.body.status;
    }
    const updatedUser = await user.save();
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal server error" });
  }
};
const deleteUserById = (req, res) => {};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
