const express = require("express");
const {
  GetAllLectures,
  GetSingleLecture,
  CreateLecture,
  UpdateLecture,
  DeleteLecture,
} = require("../controllers/lecture.controllers");
const { authenticate } = require("../middleware/auth_middleware");
const { authorization } = require("../middleware/authorize_middleware");
const lectureRouter = express.Router();

lectureRouter.get("/", authenticate, authorization, GetAllLectures);
lectureRouter.get("/:id", authenticate, authorization, GetSingleLecture);
lectureRouter.post("/", authenticate, authorization, CreateLecture);
lectureRouter.put("/:id", authenticate, authorization, UpdateLecture);
lectureRouter.delete("/:id", authenticate, authorization, DeleteLecture);

module.exports = lectureRouter;
