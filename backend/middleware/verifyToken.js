// lib/middleware/verifyToken.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
// import { cookies } from 'next/headers'; // only for middleware, not API routes
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = async (req, res, next) => {
  try {
    // Try to extract token from cookies or Authorization header
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    req.user = {
      id: user._id,
      role: user.role,
      name: decoded.name,
      email: user.email,
    };

    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Role-based guard
export const allowRoles =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
