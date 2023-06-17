const {
  validateSignup,
  validateLogin,
} = require("../middlewares/auth.middlewares");
const { RegisterUser, Login } = require("../controllers/Auth");
const { urlBasePath } = require("../utils/constants");

module.exports = (app) => {
  app.post(`${urlBasePath}/auth/signup`, [validateSignup], RegisterUser);
  app.post(`${urlBasePath}/auth/signin`, [validateLogin], Login);
};
