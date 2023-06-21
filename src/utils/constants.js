const userTypes = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  ENGINEER: "ENGINEER",
};

const userStatus = {
  APPROVED: "APPROVED",
  PENDING: "PENDING",
  REJECTED: "REJECTED",
};

const ticketStatus = {
  OPEN: "OPEN",
  INPROGRESS: "INPROGRESS",
  CLOSED: "CLOSED",
  BLOCKED: "BLOCKED",
};

const BASE_URL = `http://localhost:${process.env.PORT}`;
//const BASE_URL = `https://cust-suppt-app.onrender.com`;
const urlBasePath = "/cs/api/v1";

module.exports = { userTypes, userStatus, ticketStatus, urlBasePath, BASE_URL };
