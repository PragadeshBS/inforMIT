const router = require("express").Router();
const {
  getAllStudents,
  getStudent,
} = require("../controllers/studentController");

router.get("/students", getAllStudents);
