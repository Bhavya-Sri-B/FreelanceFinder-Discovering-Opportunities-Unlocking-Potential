require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Project, Application } = require('./Schema');
const { createServer } = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: process.env.FRONTEND_URL || 'http://localhost:3000' }
});

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Authentication Middleware
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ message: 'Invalid token' });
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Role-based Middleware
const roleMiddleware = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

// User Routes
app.post('/api/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!['client', 'freelancer'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, user: { id: user._id, name, email, role } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/users/:role', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const users = await User.find({ role: req.params.role });
    res.json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/users/:id', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Project Routes
app.post('/api/projects', authMiddleware, roleMiddleware(['client']), async (req, res) => {
  const { title, description, budget } = req.body;
  try {
    const project = new Project({ title, description, budget, client: req.user._id });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().populate('client', 'name');
    res.json(projects);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('client', 'name');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/projects/:id', authMiddleware, roleMiddleware(['client']), async (req, res) => {
  const { status } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (project.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    project.status = status;
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/projects/:id', authMiddleware, roleMiddleware(['client', 'admin']), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (req.user.role !== 'admin' && project.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await project.delete();
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Application Routes
app.post('/api/apply/:projectId', authMiddleware, roleMiddleware(['freelancer']), async (req, res) => {
  const { projectId } = req.params;
  const { proposal } = req.body;
  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    const application = new Application({ project: projectId, freelancer: req.user._id, proposal });
    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/applications/:userId', authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({ freelancer: req.params.userId }).populate('project');
    res.json(applications);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/applications/:id', authMiddleware, roleMiddleware(['client']), async (req, res) => {
  const { status } = req.body;
  try {
    const application = await Application.findById(req.params.id).populate('project');
    if (!application) return res.status(404).json({ message: 'Application not found' });
    if (application.project.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    application.status = status;
    await application.save();
    res.json(application);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Socket.io for real-time chat
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('joinRoom', ({ projectId }) => {
    socket.join(projectId);
  });
  socket.on('sendMessage', ({ projectId, message, sender }) => {
    io.to(projectId).emit('message', { sender, message, timestamp: new Date() });
  });
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));