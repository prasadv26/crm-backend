const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");

const connectDB = require("./src/config/db.config");

const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));
dotenv.config();

connectDB();

//routes
require("./src/routes/user.routes")(app);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port: ${process.env.PORT}`);
});
