const router = require("express").Router();
const { sendMessage, getMessages } = require("../controllers/message");

router.post("/send", sendMessage);

router.get("/get", getMessages);

module.exports = router;
