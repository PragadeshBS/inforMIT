const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    departments: {
      type: [String],
    },
    years: {
      type: [Number],
    },
    forStaffs: {
      type: Boolean,
    },
    forStudents: {
      type: Boolean,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    attachment: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
