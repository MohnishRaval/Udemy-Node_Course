require("../src/db/mongoose");
const task = require("../src/models/task");

task
  .findByIdAndDelete("5f48dc8666ac3a20267091af")
  .then(() => {
    console.log("Deleted successfully");
    return task.countDocuments({ completed: false });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });


 