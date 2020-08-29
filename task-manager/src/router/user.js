const express = require("express");
const router = new express.Router();
const User = require("../models/user");

//ADDING USER
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//READING ALL THE USERS
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

//FIND USER BY ID
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

//USER UPDATE
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allow_updates = ["name", "email", "age"];
  const valid_op = updates.every((update) => {
    return allow_updates.includes(update);
  });
  // console.log(updates);

  if (!valid_op) {
    return res.status(400).send({ error: "Cannot perform update" });
  }

  try {
    //console.log(updates);
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//DELETE USER
router.delete("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user_del = await User.findByIdAndDelete(req.params.id);
    if (!user_del) {
      res.status(400).send();
    }
    res.status(200).send(user_del);
  } catch (error) {
    res.status(400).send({ error: "Cannot delete user" });
  }
});

module.exports = router;
