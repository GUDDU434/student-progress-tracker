const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

module.exports.RegisterUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.send({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};
module.exports.LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    console.log(user);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const refresh_token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token, { httpOnly: true });
    res.cookie("refresh_token", refresh_token, { httpOnly: true });

    res.status(200).send({
      message: "User logged in successfully",
      accessToken: token,
      refreshToken: refresh_token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

module.exports.RefreshToken = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const newToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", newToken, { httpOnly: true });
    res.status(200).send({ message: "Token refreshed successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.LogoutUser = (req, res) => {
  try {
    res.clearCookie("token");
    res.send({ message: "User logged out successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.GetDetails = async (req, res) => {
  try {
    const user = req?.user;
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
