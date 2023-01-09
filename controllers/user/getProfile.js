const Staff = require("../../models/Staff");
const Student = require("../../models/Student");

const getProfile = async (req, res) => {
  try {
    const { email, userType } = req.query;
    if (userType === "staff") {
      const staff = await Staff.findOne({ email }).select("-password");
      if (!staff) {
        return res.status(400).json({ message: "No such user" });
      }
      return res.status(200).json({ data: staff });
    } else if (userType === "student") {
      const student = await Student.findOne({ email }).select("-password");
      if (!student) {
        return res.status(400).json({ message: "No such user" });
      }
      return res.status(200).json({ data: student });
    }
    res.status(400).json({ message: "Invalid request" });
  } catch (err) {
    console.log(err);
    res.status(500).json({});
  }
};

module.exports = { getProfile };
