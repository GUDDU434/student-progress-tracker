const express = require("express");
const {
  RegisterUser,
  LoginUser,
  LogoutUser,
  GetDetails,
} = require("../controllers/user.controller");
const { authenticate } = require("../middleware/auth_middleware");
const { authorization } = require("../middleware/authorize_middleware");
const authRouter = express.Router();

authRouter.post("/login", LoginUser);
authRouter.post("/registration", authenticate, authorization, RegisterUser);
authRouter.get("/logout", authenticate, LogoutUser);
authRouter.get("/details", authenticate, authorization, GetDetails);

module.exports = authRouter;
