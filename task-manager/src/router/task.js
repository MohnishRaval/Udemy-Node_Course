const express = require("express");
const Task = require("../models/task");
const router = express.Router();
const auth = require("../middleware/auth");

//ADDING TASK
router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//READ ALL TASKS
router.get("/tasks", auth, async (req, res) => {
  try {
    // const all_tasks = await Task.find({ owner: req.user._id });
    const match = {};
    const sort = {};
    if (req.query.completed) {
      match.completed = req.query.completed === "true";
    }
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }

    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.status(201).send(req.user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

//READ TASK BY ID
router.get("/tasks/:id", auth, async (req, res) => {
  const task_id = req.params.id;

  try {
    //const find_task = await Task.findById(task_id);
    const find_task = await Task.findOne({ _id, owner: req.user._id });
    if (!find_task) {
      res.status(404).send();
    }
    res.status(201).send(find_task);
  } catch (error) {
    res.status(500).send();
  }
});

//UPDATE TASK
router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allow_updates = ["description", "completed"];
  const valid_op = updates.every((update) => {
    return allow_updates.includes(update);
  });

  if (!valid_op) {
    return res.status(400).send({ error: "Cannot perform update" });
  }

  try {
    //const task = await Task.findByIdAndUpdate(req.params.id);
    const task = await Task.findById({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//DELETE TASK
router.delete("/tasks/:id", auth, async (req, res) => {
  const id = req.params.id;

  try {
    //const task_del = await Task.findByIdAndDelete(req.params.id);
    const task_del = await Task.findById({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task_del) {
      res.status(400).send();
    }
    res.status(200).send(task_del);
  } catch (error) {
    res.status(400).send({ error: "Cannot delete task" });
  }
});

module.exports = router;
