const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketById,
  deleteTicketById,
} = require("../controllers/Ticket");
const { validateJWT } = require("../middlewares/auth.middlewares");
const validateTicket = require("../middlewares/ticket.middlewares");
const { urlBasePath } = require("../utils/constants");

module.exports = (app) => {
  app.post(
    `${urlBasePath}/tickets`,
    [validateJWT, validateTicket],
    createTicket
  );
  app.get(`${urlBasePath}/tickets`, [validateJWT], getAllTickets);
  app.get(`${urlBasePath}/tickets/:id`, getTicketById);
  app.put(`${urlBasePath}/tickets/:id`, updateTicketById);
  app.delete(`${urlBasePath}/tickets/:id`, deleteTicketById);
};
