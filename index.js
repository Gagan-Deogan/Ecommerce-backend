const express = require("express");
const bodyParser = require("body-parser");
const { initializeDBConnection } = require("./config/db.connect");
const passport = require("passport");
const cors = require("cors");
const app = express();
const { initialize } = require("./config/passport");
const home = require("./routes/home.router");
const products = require("./routes/products.router");
const categories = require("./routes/categories.router");
const users = require("./routes/users.router");
const carts = require("./routes/carts.router");
const wishlists = require("./routes/wishlist.router");
const addresses = require("./routes/address.router");
initializeDBConnection();

const PORT = 8080;

app.use(bodyParser.json());
app.use(cors());
app.use(initialize());

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});
app.use("/home", home);
app.use((err, req, res, next) => {
  console.log("hello error");
  res.status(503).json({
    error: "Something went wrong",
  });
});
app.use("/categories", categories);
app.use("/products", products);
app.use("/users", users);
app.use("/carts", carts);
app.use("/wishlists", wishlists);
app.use("/addresses", addresses);
app.use((req, res) => {
  res.status(404).json({
    message: "route not found on server, please check",
  });
});

app.listen(PORT, () => {
  console.log("server started on port: ", PORT);
});
