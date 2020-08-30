require("./db/mongoose");

const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const port = process.env.PORT || 3000;
const jwt = require("jsonwebtoken");

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET Requests are disabled");
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   res.status(400).send("Server Maintenanace");
// });

//ROUTERS
const userRouter = require("./router/user");
const taskRouter = require("./router/task");
const User = require("./models/user");
const Task = require("./models/task");

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Port up on ", port);
});

// const myfunc = async () => {
//   const token = jwt.sign({ _id: "asd123" }, "hello", { expiresIn: "7 days" });
//   console.log(token);
//   const data = jwt.verify(token, "hello");
//   console.log(data);
// };

// myfunc();

const main = async () => {
  // const task = await Task.findById("5f4b946f9090351e50052a14");
  // await task.populate("owner").execPopulate();
  // console.log(task.owner);
  const user = await User.findById("5f4b93467fcc87299496750c");
  await user.populate("tasks").execPopulate();
  console.log(user.tasks);
};

main();
