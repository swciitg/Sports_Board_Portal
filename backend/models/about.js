const mongoose = require('mongoose');

const aboutUs = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AboutUs = mongoose.model('AboutUs', aboutUs);

module.exports = AboutUs;