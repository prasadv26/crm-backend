const Users = require("../models/user.model");

const validateSignup = async (req, res, next) => {
  const body = req.body;
  const requiredFields = [
    { field: "name", message: "Name is required" },
    { field: "username", message: "Username is required" },
    { field: "email", message: "Email is required" },
    { field: "password", message: "Password is required" },
  ];

  for (const fieldObj of requiredFields) {
    const { field, message } = fieldObj;
    if (!req.body[field]) {
      return res.status(403).send({ message });
    }
  }

  try {
    const duplicateUser = await Users.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });

    if (duplicateUser) {
      return res.status(403).send({ message: "User Already exists" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error while validationg the user" });
  }
};

const validateLogin = async (req, res, next) => {
  const requiredFields = [
    { field: "username", message: "Username is required" },
    { field: "password", message: "Password is required" },
  ];

  for (const fieldObj of requiredFields) {
    const { field, message } = fieldObj;
    if (!req.body[field]) {
      return res.status(403).send({ message });
    }
  }
  next();
};

module.exports = { validateSignup, validateLogin };
