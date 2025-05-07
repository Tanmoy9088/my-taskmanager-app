// backend/routes/taskRoutes.js
import express from 'express';
import Task from '../models/Task.js';
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Create Task
router.post('/', verifyToken, async (req, res) => {
    try {
      const task = new Task(req.body);
      const savedTask = await task.save();
      res.status(201).json({
        success: true,
        message: "Task created successfully",
        task: savedTask,
      });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });
  

// Get All Tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Single Task
router.get('/:id',verifyToken, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Task
router.put('/:id',verifyToken, async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Task
router.delete('/:id',verifyToken, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
