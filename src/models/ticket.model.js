const mongoose = require("mongoose");
const { ticketStatus } = require("../utils/constants");

const ticketSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ticketPriority: {
    type: String,
    required: true,
    default: 5,
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(ticketStatus),
  },
  requestor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  asignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

const Tickets = mongoose.model("Ticket", ticketSchema);
module.exports = Tickets;
