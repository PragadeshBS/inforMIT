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
      attachments,
    } = req.body;
    const newMessage = new Message({
      sender,
      departments,
      years,
      forStaffs,
      forStudents,
      title,
      content,
      attachments,
    });
    await newMessage.save();
    res.status(201).json({ message: "Message sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { userType, email } = req.body;
    let department, year, queryCondition;
    if (userType === "staff") {
      const staff = await Staff.findOne({ email });
      department = staff.department;
      year = staff.year;
      queryCondition = { forStaffs: true };
    } else if (userType === "student") {
      const student = await Student.findOne({ email });
      department = student.department;
      year = student.year;
      queryCondition = { forStudents: true };
    }
    console.log(department, year);
    const messages = await Message.find({
      departments: { $in: [department] },
      // 0 for all years
      years: { $in: [year] },
      ...queryCondition,
    });
    return res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { sendMessage, getMessages };
