const Users = require("../models/user.model");
const bcrypt = require("bcrypt");

const RegisterUser = async (req, res) => {
  try {
    const body = req.body;
    const newUser = await new Users({
      name: body.name,
      username: body.username,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
      userType: body.userType,
    });

    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Error while saving user" });
  }
};

const Login = async (req, res) => {
  const existingUser = await Users.findOne({ username: req.body.username });
  if (!existingUser) {
    return res.status(404).send({ message: "User does not exists." });
  }
  const isMatchedPassword = bcrypt.compareSync(
    req.body.password,
    existingUser.password
  );

  if (!isMatchedPassword) {
    return res.status(401).send({ message: "Invalid credentials" });
  }

  res.status(200).send({ message: "User Logged in Successfully" });
};

module.exports = { RegisterUser, Login };