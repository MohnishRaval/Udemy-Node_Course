const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");

//ADDING USER
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//LOGOUT USER
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//LOGOUT ALL
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
});

//READING ALL THE USERS
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

//FIND USER BY ID
// router.get("/users/:id", async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.status(201).send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

//USER UPDATE
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allow_updates = ["name", "email", "password", "age"];
  const valid_op = updates.every((update) => {
    return allow_updates.includes(update);
  });
  // console.log(updates);

  if (!valid_op) {
    return res.status(400).send({ error: "Cannot perform update" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(201).send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//DELETE USER
router.delete("/users/me", auth, async (req, res) => {
  //const id = req.params.id;
  try {
    // const user_del = await User.findByIdAndDelete(req.user._id);
    // if (!user_del) {
    //   res.status(400).send();
    // }
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send({ error: "Cannot delete user" });
  }
});

//USER LOGIN
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;
