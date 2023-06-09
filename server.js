const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./models");

// db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
// console.log('Drop and Resync Database with { force: true }');
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to KitaWarga services, You will never understand, how this works. :)" });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/admin.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
