const {
  getAllUsers,
  getUserById,
  updateUserById,
  DeleteUserById,
} = require("../controllers/User");
const {
  validateJWT,
  verifyAdmin,
  verifySelfOrAdmin,
} = require("../middlewares/auth.middlewares");
const { urlBasePath } = require("../utils/constants");

module.exports = (app) => {
  app.get(`${urlBasePath}/users`, [validateJWT, verifyAdmin], getAllUsers);
  app.get(
    `${urlBasePath}/users/:id`,
    [validateJWT, verifySelfOrAdmin],
    getUserById
  );
  app.put(`${urlBasePath}/users/:id`, updateUserById);
  app.delete(`${urlBasePath}/users/:id`, DeleteUserById);
};
