const mongoose = require("mongoose");

const attachmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    file: {
      type: Buffer,
    },
    contentType: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attachment", attachmentSchema);
