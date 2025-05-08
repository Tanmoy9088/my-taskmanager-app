import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/verifyToken.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Registration route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(201).json({ token, message: "User created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
        role: user.role,
      },
    });
    console.log(user, token);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
});
router.get("/protected", verifyToken, (req, res) => {
  res.json({ user: req.user });
});
router.get("/users", async (req, res) => {
  const users = await User.find({});
  res.json(users);
  console.log(users);
});
router.get("/me", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id); // ✅ returns one user
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

export default router;
