const Tickets = require("../models/ticket.model");
const Users = require("../models/user.model");
const { ticketStatus, userTypes, userStatus } = require("../utils/constants");

const createTicket = async (req, res) => {
  try {
    const { title, description, ticketPriority } = req.body;
    const ticket = {
      title,
      description,
      ticketPriority,
      status: ticketStatus.OPEN,
      requestor: req.currentUser._id,
    };

    const availableEngineers = await Users.find({
      userType: userTypes.ENGINEER,
      userStatus: userStatus.APPROVED,
    });
    if (availableEngineers.length === 0) {
      return res.status(400).send("Sorry! Cannot Process this ticket");
    }
    const randomIndex = Math.floor(Math.random() * availableEngineers.length);
    const assignEngineer = availableEngineers[randomIndex];
    ticket.asignee = assignEngineer._id;

    const newTicket = await new Tickets(ticket);
    const createdTicket = await newTicket.save();

    res.status(201).send(createdTicket);
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Error while saving user" });
  }
};
const getAllTickets = async (req, res) => {
  try {
    let condition = {};
    //to get tickets raised current customer or assigned to current engineer
    if (req.currentUser.userType === userTypes.CUSTOMER) {
      condition.requestor = req.currentUser._id;
    } else if (req.currentUser.userType === userTypes.ENGINEER) {
      condition.asignee = req.currentUser._id;
    }

    //query params
    const { maxPriority, minPriority, page, limit, ticketPriority } = req.query;

    //filter
    if (minPriority && maxPriority) {
      condition.ticketPriority = {
        $gte: minPriority,
        $lte: maxPriority,
      };
    } else if (maxPriority) {
      condition.ticketPriority = { $lte: maxPriority };
    }

    //pagination
    const skipValue = page * limit;

    //sort
    const sortCondition = {};
    sortCondition.ticketPriority = ticketPriority === "asc" ? 1 : -1;

    const tickets = await Tickets.find(condition)
      .populate("requestor")
      .populate("asignee")
      .skip(skipValue)
      .limit(limit)
      .sort(sortCondition);
    res.status(200).send(tickets);
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Error while saving user" });
  }
};
const getTicketById = (req, res) => {};
const updateTicketById = (req, res) => {};
const deleteTicketById = (req, res) => {};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketById,
  deleteTicketById,
};
