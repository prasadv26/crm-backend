const userTypes = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  ENGINEER: "ENGINEER",
};

const userStatus = {
  APROVED: "APROVED",
  PENDING: "PENDING",
  REJECTED: "REJECTED",
};

const ticketStatus = {
  OPEN: "OPEN",
  INPROGRESS: "INPROGRESS",
  CLOSED: "CLOSED",
  BLOCKED: "BLOCKED",
};

const urlBasePath = "/cs/api/v1";

module.exports = { userTypes, userStatus, ticketStatus, urlBasePath };
