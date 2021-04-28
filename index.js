const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const cors = require("cors")

const app = express();

app.use(bodyParser.json());
app.use(cors())

const home = require("./routes/home.router.js")
const products = require("./routes/products.router.js")
const categories = require("./routes/categories.router.js")
const users = require("./routes/users.router.js")
const carts = require("./routes/carts.router.js")
const { initializeDBConnection } = require("./db/db.connect.js")

const PORT = 3000;

// called before any route handler
initializeDBConnection();

app.use("/products", products);
app.use("/home", home)
app.use("/categories", categories)
app.use("/users", users)
app.use("/carts", carts)

app.get('/', (request, response) => {
  response.json({ hello: "world"})
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "route not found on server, please check"})
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "error occured, see the errMessage key for more details", errorMessage: err.message})
})

app.listen(PORT, () => {
  console.log('server started on port: ', PORT);
});
