const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['client', 'freelancer', 'admin'], required: true },
  createdAt: { type: Date, default: Date.now },
  rating: { type: Number, default: 0 },
  reviews: [{ type: String }]
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['open', 'in-progress', 'completed'], default: 'open' },
  createdAt: { type: Date, default: Date.now }
});

const applicationSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  proposal: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  submission: { type: String } // URL or reference to submitted work
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Project: mongoose.model('Project', projectSchema),
  Application: mongoose.model('Application', applicationSchema)
};