const Message = require("../models/Message");
const Attachment = require("../models/Attachment");
const Staff = require("../models/Staff");
const Student = require("../models/Student");

const sendMessage = async (req, res) => {
  try {
    const {
      sender,
      departments,
      years,
      forStaffs,
      forStudents,
      title,
      content,
      attachment,
    } = req.body;
    const newMessage = new Message({
      sender,
      departments,
      years,
      forStaffs,
      forStudents,
      title,
      content,
      attachment,
    });
    await newMessage.save();
    res.status(201).json({ message: "Message sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { userType, email } = req.query;
    let department, year;
    if (userType === "staff") {
      const staff = await Staff.findOne({ email });
      department = staff.department;
      const messages = await Message.find({
        departments: { $in: [department] },
        forStaffs: true,
      }).sort({ createdAt: -1 });
      return res.status(200).json({ messages });
    } else if (userType === "student") {
      const student = await Student.findOne({ email });
      department = student.department;
      year = student.year;
      const messages = await Message.find({
        departments: { $in: [department] },
        forStudents: true,
        years: { $in: [year] },
      }).sort({ createdAt: -1 });
      return res.status(200).json({ messages });
    }
    return res.status(400).json({ message: "Invalid user type" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { sendMessage, getMessages };
