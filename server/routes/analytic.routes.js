const express = require("express");
const { GetUserList } = require("../controllers/analytics.controllers");
const { authenticate } = require("../middleware/auth_middleware");
const { authorization } = require("../middleware/authorize_middleware");
const analyticRouter = express.Router();

analyticRouter.get("/studentStats", authenticate, authorization, GetUserList);



module.exports = analyticRouter;
