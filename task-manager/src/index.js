require("./db/mongoose");

const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const port = process.env.PORT || 3000;
const jwt = require("jsonwebtoken");

//ROUTERS
const userRouter = require("./router/user");
const taskRouter = require("./router/task");
const User = require("./models/user");
const Task = require("./models/task");

// const multer = require("multer");
// const upload = multer({
//   dest: "images",
//   limits: { fileSize: 1000000 },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error("Please upload Word document"));
//     }
//     cb(undefined, true);
//   },
// });

// app.post(
//   "/upload",
//   upload.single("upload"),
//   (req, res) => {
//     res.send();
//   },
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
//   }
// );

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Port up on ", port);
});
