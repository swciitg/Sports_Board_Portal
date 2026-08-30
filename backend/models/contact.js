import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  designation: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // A contact with a club is that club's secretary; without one it is core team.
  club: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contacts = mongoose.model('Contacts', contactSchema);

export default  Contacts;