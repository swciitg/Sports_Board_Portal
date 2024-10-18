const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    trim: true,
  },
  image: {
    type: String, 
    required: true,
  },
  socialLinks: {
    linkedin: { type: String, trim: true },
    instagram: { type: String, trim: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

module.exports = TeamMember;