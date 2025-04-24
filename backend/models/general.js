import mongoose from 'mongoose';

const homePageData = new mongoose.Schema({
  boardname: {
    type: String,
    required: true,
  },
  heroimage: {
    type: String,
    required: true,
  },
  eventimgurl: {
    type: String,
    required: true,
  },
  contactpageimgurl: {
    type: String,
    required: true,
  },
  logoimgurl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  clubheroimg: {
    type: String,
    required: true,
  },
  chairmanname: {
    type: String,
    required: true,
  },
  chairmanimgurl: {
    type: String,
    required: true,
  },
  aboutchairman: {
    type: String,
    required: true,
  },
  chairmandescription: {
    type: String,
    required: true,
  },
  gensecname: {
    type: String,
    required: true,
  },
  gensecimg: {
    type: String,
    required: true,
  },
  aboutgensec: {
    type: String,
    required: true,
  },
  gensecdescription: {
    type: String,
    required: true,
  }
});

const Homepage = mongoose.model('HomePageData', homePageData);

export default Homepage;