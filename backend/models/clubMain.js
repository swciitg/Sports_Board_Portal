import mongoose from "mongoose";

const clubmain = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  safeName: {
    type: String,
    required: true,
  },
  topSection: {
    text: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  aboutUsSection: {
    text: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  rulesSection: {
    text: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
});

const clubMain = mongoose.model("ClubMain", clubmain);

export default clubMain;
