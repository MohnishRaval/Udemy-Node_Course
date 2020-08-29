require("./db/mongoose");

const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const port = process.env.PORT || 3000;

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
//   const pass = "abc123";
//   const hash_pass = await bcrypt.hash(pass, 8);
//   //console.log(pass);
//   //console.log(hash_pass);
//   const ismatch = await bcrypt.compare(pass, hash_pass);
//   console.log(ismatch);
// };

// myfunc();
