const router = require("express").Router();
const { getProfile } = require("../controllers/user/getProfile");

router.get("/get-profile", getProfile);

module.exports = router;
