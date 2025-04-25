const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false // Or true if every project must have an image
  },
  tags: {
    type: [String], // Array of strings
    required: false
  },
  githubLink: {
    type: String,
    required: false
  },
  liveLink: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  // Add any other fields you need for your projects
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
