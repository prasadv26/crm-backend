const Users = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { userTypes } = require("../utils/constants");

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

const validateJWT = (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    return res.status(401).send("JWT access token not provided");
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        return res.status(403).send({
          message: err.message || "Invalid JWT access token",
        });
      }
      const user = await Users.findOne({ username: payload.id });
      req.currentUser = user;
      next();
    });
  } catch (error) {
    return res.status(500).send("Error while validating JWT token");
  }
};

const verifyAdmin = async (req, res, next) => {
  if (!(req.currentUser && req.currentUser.userType === "ADMIN")) {
    return res
      .status(403)
      .send({ message: "You are Unauthorized to access this page" });
  }
  next();
};

const verifySelfOrAdmin = async (req, res, next) => {
  const askedUser = req.params.id.toLowerCase();

  if (
    !(
      req.currentUser.username === askedUser ||
      req.currentUser.userType === userTypes.ADMIN
    )
  ) {
    return res
      .status(403)
      .send({ message: "You are Unauthorized to access this page" });
  }
  next();
};

module.exports = {
  validateSignup,
  validateLogin,
  validateJWT,
  verifyAdmin,
  verifySelfOrAdmin,
};
