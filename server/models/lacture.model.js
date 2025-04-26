const mongoose = require("mongoose");

const lactureSchema = new mongoose.Schema(
  {
    lacture_title: {
      type: String,
      required: true,
    },
    lacture_date: {
      type: Date,
      required: true,
    },
    lacture_video_link: {
      type: String,
      required: true,
    },
    lacture_material_link: {
      type: String,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    track: {
      type: String,
      enum: ["mern", "java", "da", "ds"],
      required: true,
    },
    students: [
      {
        student_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        attended: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Lacture = mongoose.model("Lacture", lactureSchema);

module.exports = Lacture;
