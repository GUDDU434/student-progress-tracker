const Assignment = require("../models/assignment.model");

module.exports.GetAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).send({ message: "Assignment not found" });
    }
    res.status(200).send(assignment);
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
      .limit(limit)
      .skip((page - 1) * limit);


    res.status(200).send(assignments);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.CreateAssignment = async (req, res) => {
  try {
    const assignment = new Assignment({ ...req.body, posted_by : req.user._id });
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
