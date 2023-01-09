require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path, new Date().toLocaleString());
  next();
});

app.use("/api/auth/", authRoutes);
app.use("/api/message/", messageRoutes);
app.use("/api/user/", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Connected to MongoDB\nServer running on port ${process.env.PORT}`
    );
  });
});
