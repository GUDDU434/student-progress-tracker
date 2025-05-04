const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "Authorization token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    const { userId } = decoded;
    if (!userId) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    req.user = user;

    next();
  } catch (error) {
    // console.log("catch Error", error);
    res.status(401).json({ message: "Unauthenticated" });
  }
};

module.exports = { authenticate };
