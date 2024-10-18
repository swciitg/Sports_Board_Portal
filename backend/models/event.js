const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  frontImage: {
    type: String,
    required: true,
  }, 
  eventIntroDesc: {
    type: String,
    required: true,
  },
  eventActivityDesc: {
    type: String,
    required: true,
  },
  pastWinners: {
    type: [String],
    required: true,
  },
  milestones: {
    type: [String],
    required: true,
  },
  galleryImages: {
    type: [String],
    required: true,
  },
  memberImages: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
