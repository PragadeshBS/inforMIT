const argon2 = require("argon2");
const generateToken = require("../../utils/generateJwt");
const Student = require("../../models/Student");

const studentSignUp = async (req, res) => {
  try {
    const { name, registerNo, department, email, year, password } = req.body;
    let emailAlreadyExists = await Student.findOne({ email });
    if (emailAlreadyExists)
      return res.status(400).json({ message: "Email already exists" });
    let registerNoAlreadyExists = await Student.findOne({ registerNo });
    if (registerNoAlreadyExists)
      return res
        .status(400)
        .json({ messgae: "Register Number already exists" });
    const hashedPassword = await argon2.hash(password);
    const student = await Student.create({
      name,
      registerNo,
      department,
      email,
      year,
      password: hashedPassword,
    });
    return res.status(200).json({
      email,
      userType: "student",
      token: generateToken(student._id),
      message: "Student created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const studentLogin = async (req, res) => {
  try {
    const { registerNo, password } = req.body;
    let student = await Student.findOne({ registerNo });
    if (!student) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (await argon2.verify(student.password, password)) {
      return res.status(200).json({
        email: student.email,
        userType: "student",
        token: generateToken(student._id),
        message: "Student login successful",
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { studentLogin, studentSignUp };
