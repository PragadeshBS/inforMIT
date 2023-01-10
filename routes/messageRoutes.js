const router = require("express").Router();
const multer = require("multer");
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

const {
  uploadAttachment,
  getAttachment,
} = require("../controllers/attachment");
const { sendMessage, getMessages } = require("../controllers/message");

router.post("/send", sendMessage);

router.get("/get", getMessages);

router.post("/attachment", upload.single("file"), uploadAttachment);

router.get("/attachment/:id", getAttachment);

module.exports = router;
