const Attachment = require("../models/Attachment");

const uploadAttachment = async (req, res) => {
  const attachment = {
    name: req.body.fileName,
    file: new Buffer.from(req.file.buffer, "base64"),
    contentType: req.file.mimetype,
  };
  const savedAttachment = await Attachment.create(attachment);
  res.status(200).json({
    message: "File uploaded successfully",
    fileId: savedAttachment._id,
  });
};

const getAttachment = async (req, res) => {
  const { id } = req.params;
  const attachment = await Attachment.findById(id);
  if (!attachment) {
    return res.status(400).json({ message: "Attachment not found" });
  }
  res
    .status(200)
    .json({ message: "Attachment fetched successfully", attachment });
};

module.exports = { uploadAttachment, getAttachment };
