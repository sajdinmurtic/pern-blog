const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken= (user_id)=> {
  
  return jwt.sign({user: {id:user_id}}, process.env.jwtsecret, { expiresIn: "30d" });
}

module.exports = generateToken;