const express = require("express");
const {
  CreateAssignment,
  GetAssignmentById,
  UpdateAssignment,
  DeleteAssignment,
} = require("../controllers/assignment.controllers");
const { authenticate } = require("../middleware/auth_middleware");
const { authorization } = require("../middleware/authorize_middleware");
const assignmentRouter = express.Router();

assignmentRouter.post("/", authenticate, authorization, CreateAssignment);
assignmentRouter.get("/:id", authenticate, authorization, GetAssignmentById);
assignmentRouter.put("/:id", authenticate, authorization, UpdateAssignment);
assignmentRouter.delete("/:id", authenticate, authorization, DeleteAssignment);

module.exports = assignmentRouter;

