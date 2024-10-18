const mongoose = require('mongoose');

const facilitiesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  game: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Facilities = mongoose.model('Facilities', facilitiesSchema);

module.exports = Facilities;