const {
  validateSignup,
  validateLogin,
} = require("../middlewares/auth.middlewares");
const {
  RegisterUser,
  Login,
  ForgetPassword,
  ResetPassword,
} = require("../controllers/Auth");
const { urlBasePath } = require("../utils/constants");

module.exports = (app) => {
  app.post(`${urlBasePath}/auth/signup`, [validateSignup], RegisterUser);
  app.post(`${urlBasePath}/auth/signin`, [validateLogin], Login);
  app.post(`${urlBasePath}/forgot-password`, ForgetPassword);
  app.post(`${urlBasePath}/reset-password/:id/:token`, ResetPassword);
};
