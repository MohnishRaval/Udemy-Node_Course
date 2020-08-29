require("../src/db/mongoose");
const User = require("../src/models/user");
const Task = require("../src/models/task");

//5f477aeb445aec32042a27c2
// User.findByIdAndUpdate("5f477aeb445aec32042a27c2", { age: 1 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const updateagecount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};
updateagecount("5f4789429b2aee2630a5a3dd", 2)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });

const deletetaskandcount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deletetaskandcount("5f493c308c1feb1afca292c9")
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
