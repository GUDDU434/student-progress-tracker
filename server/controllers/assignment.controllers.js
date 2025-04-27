const Assignment = require("../models/assignment.model");
const { SendSuccessResponse, CalculateNextUrl } = require("../utils/commonfun");

module.exports.GetAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate("posted_by", "name")
      .lean();
    if (!assignment) {
      return res.status(404).send({ message: "Assignment not found" });
    }
    return SendSuccessResponse(res, 200, "Assignment fetched successfully", {
      ...assignment,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.GetAllAssignments = async (req, res) => {
  try {
    let { limit = 10, page = 1 } = req.query;
    let user = req?.user;

    let query = { track: user.track };
    const assignments = await Assignment.find(query)
      .populate("posted_by", "name")
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await Assignment.countDocuments(query);

    let nextUrl = CalculateNextUrl(req, page, limit, total);

    SendSuccessResponse(res, 200, "Assignments fetched successfully", {
      assignments,
      nextUrl,
      total,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.CreateAssignment = async (req, res) => {
  try {
    const assignment = new Assignment({ ...req.body, posted_by: req.user._id });
    await assignment.save();
    res.status(201).send({ message: "Assignment created successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.UpdateAssignment = async (req, res) => {
  try {
    let user = req.user;

    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!assignment) {
      return res.status(404).send({ message: "Assignment not found" });
    }
    res.status(200).send({ message: "Assignment updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.DeleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) {
      return res.status(404).send({ message: "Assignment not found" });
    }
    res.status(200).send({ message: "Assignment deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
