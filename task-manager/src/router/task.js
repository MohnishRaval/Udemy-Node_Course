const express = require("express");
const Task = require("../models/task");
const router = express.Router();

//ADDING TASK
router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//READ ALL TASKS
router.get("/tasks", async (req, res) => {
  try {
    const all_tasks = await Task.find({});
    res.status(201).send(all_tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

//READ TASK BY ID
router.get("/tasks/:id", async (req, res) => {
  const task_id = req.params.id;

  try {
    const find_task = await Task.findById(task_id);
    if (!find_task) {
      res.status(400).send();
    }
    res.status(201).send(find_task);
  } catch (error) {
    res.status(400).send();
  }
});

//UPDATE TASK
router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allow_updates = ["description", "completed"];
  const valid_op = updates.every((update) => {
    return allow_updates.includes(update);
  });

  if (!valid_op) {
    return res.status(400).send({ error: "Cannot perform update" });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id);
    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!task) {
      return res.status(404).send();
    }
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//DELETE TASK
router.delete("/tasks/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const task_del = await Task.findByIdAndDelete(req.params.id);
    if (!task_del) {
      res.status(400).send();
    }
    res.status(200).send(task_del);
  } catch (error) {
    res.status(400).send({ error: "Cannot delete task" });
  }
});

module.exports = router;
