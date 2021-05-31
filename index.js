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

initializeDBConnection();

const PORT = 8080;

app.use(bodyParser.json());
app.use(cors());
app.use(initialize());

app.use("/products", products);
app.use("/home", home);
app.use("/categories", categories);
app.use("/users", users);
app.use("/carts", carts);
app.use("/wishlists", wishlists);

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.use((err, req, res, next) => {
  res.status(503).json({
    success: false,
    error: "Something went wrong",
  });
});
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "route not found on server, please check",
  });
});

app.listen(PORT, () => {
  console.log("server started on port: ", PORT);
});
