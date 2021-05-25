const express = require("express");
const bodyParser = require("body-parser");
const { initializeDBConnection } = require("./config/db.connect.js");
const passport = require('passport');
const cors = require("cors");
const app = express();
require('./config/passport')(passport); 
const home = require("./routes/home.router.js");
const products = require("./routes/products.router.js");
const categories = require("./routes/categories.router.js");
const users = require("./routes/users.router.js");
const carts = require("./routes/carts.router.js");


initializeDBConnection();

const PORT = 8080;

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use("/products", products);
app.use("/home", home);
app.use("/categories", categories);
app.use("/users", users);
app.use("/carts", carts);

app.get("/", (request, response) => {
  response.json({ hello: "world" });
});

app.use((req, res) => {
  res.status(500).json({
    success: false,
    message: "route not found on server, please check",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log("server started on port: ", PORT);
});
