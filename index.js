const express = require("express");
const bodyParser = require("body-parser");
const home = require("./routes/home.router.js");
const products = require("./routes/products.router.js");
const categories = require("./routes/categories.router.js");
const users = require("./routes/users.router.js");
const carts = require("./routes/carts.router.js");
const { initializeDBConnection } = require("./db/db.connect.js");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = 8080;

// called before any route handler
initializeDBConnection();

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
