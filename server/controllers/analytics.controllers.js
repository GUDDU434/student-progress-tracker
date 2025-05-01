const Lacture = require("../models/lacture.model");
const User = require("../models/user.model");
const { SendSuccessResponse } = require("../utils/commonfun");

module.exports.GetUserList = async (req, res) => {
  const track = req.user.track;
  try {
    const results = await User.aggregate([
      {
        $match: { role: "student", track: track },
      },
      {
        $lookup: {
          from: "assignments", // collection name in lowercase and plural
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$$userId", "$submitted_by"] },
              },
            },
            {
              $count: "assignmentCount",
            },
          ],
          as: "assignment_stats",
        },
      },
      {
        $lookup: {
          from: "lactures", // collection name in lowercase and plural
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $gt: [
                    {
                      $size: {
                        $filter: {
                          input: "$students",
                          as: "student",
                          cond: { $eq: ["$$student.student_id", "$$userId"] },
                        },
                      },
                    },
                    0,
                  ],
                },
              },
            },
            {
              $count: "lectureCount",
            },
          ],
          as: "lecture_stats",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          assignmentCount: {
            $ifNull: [
              { $arrayElemAt: ["$assignment_stats.assignmentCount", 0] },
              0,
            ],
          },
          lectureCount: {
            $ifNull: [{ $arrayElemAt: ["$lecture_stats.lectureCount", 0] }, 0],
          },
        },
      },
    ]);

    return SendSuccessResponse(
      res,
      200,
      "User list fetched successfully",
      results
    );
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};
