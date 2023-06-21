const Users = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  userTypes,
  userStatus,
  urlBasePath,
  BASE_URL,
} = require("../utils/constants");
const registerUserMail = require("../templates/registerEmailTemplate");
const passwordResetMail = require("../templates/passwordResetMail");

const RegisterUser = async (req, res) => {
  try {
    const body = req.body;
    let status =
      body.userType === userTypes.CUSTOMER
        ? userStatus.APPROVED
        : userStatus.PENDING;
    const newUser = await new Users({
      name: body.name,
      username: body.username,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
      userType: body.userType,
      userStatus: status,
      createdAt: body.createdAt,
    });

    const savedUser = await newUser.save();
    registerUserMail(savedUser);
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

  const token = jwt.sign(
    { id: existingUser.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res
    .status(200)
    .send({ message: `${existingUser.userType} Logged In  token: ${token}` });
};

const ForgetPassword = async (req, res) => {
  const userExists = await Users.findOne({ email: req.body.email });

  if (!userExists) {
    return res
      .status(401)
      .send({ message: "User with this email does not exist." });
  }

  const id = userExists._id.toString();
  console.log(id);
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  try {
    const updatedUser = await Users.findByIdAndUpdate(
      { _id: id },
      { $set: { passwordResetToken: token } },
      { new: true }
    );
  } catch (error) {
    return res
      .status(500)
      .send(error.message || { message: "Error while setting JWT token" });
  }

  const resetPasswordLink = `${BASE_URL}/${urlBasePath}/reset-password/${id}/${token}`;

  //send email
  await passwordResetMail(userExists, resetPasswordLink);

  res
    .status(200)
    .send({ message: "Password reset link sent on " + userExists.email });
};

const ResetPassword = async (req, res) => {
  const { id, token } = req.params;
  const userExists = await Users.findOne({
    _id: id,
    passwordResetToken: token,
  });

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifiedToken) {
      return res
        .status(401)
        .send({ message: "Invalid JWT. Unauthorized access" });
    }

    const updatedUser = await Users.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          passwordResetToken: "",
          password: bcrypt.hashSync(req.body.password, 10),
        },
      },
      { new: true }
    );
  } catch (error) {
    return res
      .status(500)
      .send(error.message || { message: "Error while setting JWT token" });
  }

  res.status(200).send({ message: "Password Changed!" });
};

module.exports = { RegisterUser, Login, ForgetPassword, ResetPassword };
