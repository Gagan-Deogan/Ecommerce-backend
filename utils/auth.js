const jsonwebtoken = require("jsonwebtoken")
const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');



const issueJWT = (userId) => {
  console.log("userId",userId)
  const expiresIn = '1d';

  const payload = {
    sub: userId,
    iat: Date.now()
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}

module.exports.issueJWT = issueJWT;
