const mongoose = require("mongoose")


const mySecret = process.env['monogoDB_password']

function initializeDBConnection() {
  // Connecting to DB
  mongoose.connect(`mongodb+srv://Gagandeep:${mySecret}@videolibaray.licm8.mongodb.net/inventory?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
    .then(() => console.log("successfully connected"))
    .catch(error => console.error("mongoose connection failed...", error))
}

module.exports = { initializeDBConnection }

