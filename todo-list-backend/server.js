// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// CORS (Cross-Origin Resource Sharing) Middleware
app.use(cors());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to TodoList application." });
});

// Importing routes
require("./routes/task.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
