const argon2 = require("argon2");
const Staff = require("../../models/Staff");
const generateToken = require("../../utils/generateJwt");

const staffSignUp = async (req, res) => {
  try {
    const { name, staffId, department, email, password } = req.body;
    let emailAlreadyExists = await Staff.findOne({ email });
    if (emailAlreadyExists)
      return res.status(400).json({ message: "Email already exists" });
    let staffIdAlreadyExists = await Staff.findOne({ staffId });
    if (staffIdAlreadyExists)
      return res.status(400).json({ messgae: "Staff ID already exists" });
    const hashedPassword = await argon2.hash(password);
    const staff = await Staff.create({
      name,
      staffId,
      department,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({
      email,
      userType: "staff",
      token: generateToken(staff._id),
      message: "Staff created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const staffLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let staff = await Staff.findOne({ email });
    if (!staff) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (await argon2.verify(staff.password, password)) {
      return res.status(200).json({
        email,
        token: generateToken(staff._id),
        message: "Staff Login successful",
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { staffLogin, staffSignUp };
