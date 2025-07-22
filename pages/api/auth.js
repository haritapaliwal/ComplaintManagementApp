import connectDB from '../../lib/db';
import User from '../../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === 'POST') {
      const { action, email, password, role } = req.body;
      if (action === 'register') {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ error: 'User already exists' });
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashed, role: role || 'user' });
        return res.status(201).json({ message: 'User registered', user: { email: user.email, role: user.role } });
      }
      if (action === 'login') {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
        const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
        return res.status(200).json({ token, user: { email: user.email, role: user.role } });
      }
      return res.status(400).json({ error: 'Invalid action' });
    }

    if (req.method === 'GET') {
      const { token } = req.query;
      if (!token) return res.status(401).json({ error: 'No token' });
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return res.status(200).json({ user: decoded });
      } catch {
        return res.status(401).json({ error: 'Invalid token' });
      }
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
} 