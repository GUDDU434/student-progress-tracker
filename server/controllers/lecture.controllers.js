const Lecture = require("../models/lacture.model");
const { CalculateNextUrl, SendSuccessResponse } = require("../utils/commonfun");

module.exports.GetAllLectures = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;

    const query = {};

    const lectures = await Lecture.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Lecture.countDocuments(query);

    let nextUrl = CalculateNextUrl(req, page, limit, total);

    return SendSuccessResponse(res, 200, "Lectures fetched successfully", {
      nextUrl,
      lectures,
      total,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.GetSingleLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);
    if (!lecture) {
      return res.status(404).send({ message: "Lecture not found" });
    }
    res.status(200).send(lecture);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.CreateLecture = async (req, res) => {
  try {
    const lecture = new Lecture({ ...req.body, instructor: req.user._id });
    await lecture.save();
    // res.status(201).send({ message: "Lecture created successfully" });
    return SendSuccessResponse(res, 201, "Lecture created successfully", {
      lecture,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.UpdateLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!lecture) {
      return res.status(404).send({ message: "Lecture not found" });
    }
    res.status(200).send({ message: "Lecture updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.DeleteLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndDelete(req.params.id);
    if (!lecture) {
      return res.status(404).send({ message: "Lecture not found" });
    }
    res.status(200).send({ message: "Lecture deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
