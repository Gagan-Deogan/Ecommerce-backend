const passport = require("passport");

const ensureAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: "Invalid Token" });
  }
  return;
};

module.exports = { ensureAuthenticated };
