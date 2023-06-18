const validateTicket = (req, res, next) => {
  const requiredFields = [
    { field: "title", message: "Title is required" },
    { field: "description", message: "Description is required" },
  ];

  for (const fieldObj of requiredFields) {
    const { field, message } = fieldObj;
    if (!req.body[field]) {
      return res.status(403).send({ message });
    }
  }
  next();
};

module.exports = validateTicket;
