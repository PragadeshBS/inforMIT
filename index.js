require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path, new Date().toLocaleString());
  next();
});

app.use("/api/auth/", authRoutes);
app.use("/api/message/", messageRoutes);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Connected to MongoDB\nServer running on port ${process.env.PORT}`
    );
  });
});
