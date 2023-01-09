const {
  studentSignUp,
  studentLogin,
} = require("../controllers/auth/studentAuth");
const { staffSignUp, staffLogin } = require("../controllers/auth/staffAuth");

const router = require("express").Router();

// student auth routes
router.post("/student-signup", studentSignUp);
router.post("/student-login", studentLogin);

// staff auth routes
router.post("/staff-signup", staffSignUp);
router.post("/staff-login", staffLogin);

module.exports = router;
