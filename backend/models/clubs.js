const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  aboutDesc: {
    type: String,
    required: true,
  },
  rules: {
    type: String,
    required: true,
  },
  pastEvents: {
    type: [String],
    required: true,
  },
  achievements: {
    type: [String],
    required: true,
  },
  galleryImages: {
    type: [String],
    required: true,
  },
  leaderImages: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;