const mongoose = require("mongoose");

const attachmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    file: {
      type: Buffer,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attachment", attachmentSchema);
