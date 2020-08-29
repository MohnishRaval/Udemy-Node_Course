require("./db/mongoose");
const Task = require("./models/task");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

//ROUTERS
const userRouter = require("./router/user");
const taskRouter = require("./router/task");

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Port up on ", port);
});
