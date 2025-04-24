import mongoose from "mongoose";

const clubmain = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  safeName: {
    type: String,
    required: true,
  },
  img: {
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
  aboutusimg: {
    type: String,
    required: true,
  },
  rulesimg: {
    type: String,
    required: true,
  },
  pastEventsImg: {
    type: String,
    required: true,
  },
  achievementsImg: {
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

const clubMain = mongoose.model("ClubMain", clubmain);

export default clubMain;
