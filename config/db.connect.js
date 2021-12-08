const mongoose = require("mongoose");
const yenv = require("yenv");
const env = yenv("app.yaml", { env: "env_variables" });

const mySecret = env["DBPASSWORD"];

const initializeDBConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://Gagandeep:${mySecret}@videolibaray.licm8.mongodb.net/inventory?retryWrites=true&w=majority`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    );
    console.log("db connected");
  } catch (error) {
    return console.log(error);
  }
};
module.exports = { initializeDBConnection };
