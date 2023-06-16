const Users = require("../src/models/user.model");

const validateSignup = async (req, res, next) => {
  const body = req.body;
  if (!body.name) {
    return res.status(403).send({ message: "Name is required" });
  }
  if (!body.username) {
    return res.status(403).send({ message: "Username is required" });
  }
  if (!body.email) {
    return res.status(403).send({ message: "Email is required" });
  }
  if (!body.password) {
    return res.status(403).send({ message: "Password is required" });
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
  if (!req.body.username) {
    return res.status(403).send({ message: "Username is required" });
  }
  if (!req.body.password) {
    return res.status(403).send({ message: "Password is required" });
  }
  next();
};

module.exports = { validateSignup, validateLogin };
