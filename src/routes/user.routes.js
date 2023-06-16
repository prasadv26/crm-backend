const {
  validateSignup,
  validateLogin,
} = require("../../middlewares/auth.middlewares");
const { RegisterUser, Login } = require("../controllers/Auth");

module.exports = (app) => {
  app.post("/auth/signup", [validateSignup], RegisterUser);
  app.post("/auth/signin", [validateLogin], Login);
};
