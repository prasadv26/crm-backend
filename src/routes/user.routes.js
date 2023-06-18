const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/User");
const {
  validateJWT,
  verifyAdmin,
  verifySelfOrAdmin,
} = require("../middlewares/auth.middlewares");

const cache = require("../middlewares/cache.middlewares");
const { urlBasePath } = require("../utils/constants");

module.exports = (app) => {
  app.get(
    `${urlBasePath}/users`,
    [validateJWT, verifyAdmin, cache(60)],
    getAllUsers
  );
  app.get(
    `${urlBasePath}/users/:id`,
    [validateJWT, verifySelfOrAdmin],
    getUserById
  );
  app.put(
    `${urlBasePath}/users/:id`,
    [validateJWT, verifySelfOrAdmin],
    updateUserById
  );
  app.delete(`${urlBasePath}/users/:id`, deleteUserById);
};
