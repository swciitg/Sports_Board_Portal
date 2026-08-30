import mongoose from 'mongoose';

// Single-value config resource: whichever tenure year is entered here is
// what the site shows wherever a "20XX–YY tenure" label appears (currently
// both sections of the Contacts page). Admins are expected to keep exactly
// one document in this collection.
const tenureYearSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true,
    trim: true,
  },
});

const TenureYear = mongoose.model('TenureYear', tenureYearSchema);

export default TenureYear;
