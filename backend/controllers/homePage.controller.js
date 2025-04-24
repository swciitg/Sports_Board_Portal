import AboutUs from '../models/aboutUs.js';
import Facilities from '../models/facilities.js';
import Homepage from '../models/general.js';
import TeamMember from '../models/teamMember.js';

// Controller function to fetch all the data
export const getHomePageData = async (req, res) => {
  try {
    // console.log('Fetching homepage data...');
    const aboutData = await AboutUs.find();
    const facilities = await Facilities.find();
    const teamMember = await TeamMember.find();
    const homepage = await Homepage.find();
    res.status(200).json({
      aboutData,
      homepage,
      facilities,
      teamMember,
    });
    // console.log('Data fetched successfully!');
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
};
