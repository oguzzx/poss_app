const User = require("../models/User");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//! register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json("A new user has been added successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

//! login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json("Kullanıcı Bulunamadı");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) res.status(400).json("Wrong credentials");
    else res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
