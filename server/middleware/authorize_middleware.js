const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

const authorization = (req, res, next) => {
  try {
    const user = req?.user;

    if (!user) {
      return res.status(401).json({ message: "Authentication Failed" });
    }

    
    if (user.role !== "admin") {
      if (req.url.includes("/registration")) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { authorization };
