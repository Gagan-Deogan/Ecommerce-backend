const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

const generateHash = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const isValidPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const issueJWT = (userId) => {
  const expiresIn = "1d";

  const payload = {
    sub: userId,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });
  return {
    token: "Bearer " + signedToken,
  };
};
const extractProtectedKey = (user) => {
  const userExtracted = {
    name: user.name,
    email: user.email,
    image: user.image,
  };
  return userExtracted;
};

module.exports = {
  issueJWT,
  generateHash,
  isValidPassword,
  extractProtectedKey,
};
