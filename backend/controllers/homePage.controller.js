import AboutUs from '../models/aboutUs.js';
import Facilities from '../models/facilities.js';
import TeamMember from '../models/teamMember.js';

// Controller function to fetch all the data
export const getHomePageData = async (req, res) => {
  try {
    const aboutData = await AboutUs.find();
    const facilities = await Facilities.find();
    const teamMember = await TeamMember.find();

    // Send all the data as a JSON response
    res.status(200).json({
      aboutData,
      facilities,
      teamMember,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
};
