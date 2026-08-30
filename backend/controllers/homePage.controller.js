import AboutUs from '../models/aboutUs.js';
import Facilities from '../models/facilities.js';
import Homepage from '../models/general.js';
import TenureYear from '../models/tenureYear.js';

// Controller function to fetch all the data
export const getHomePageData = async (req, res) => {
  try {
    // console.log('Fetching homepage data...');
    const aboutData = await AboutUs.find();
    const facilities = await Facilities.find();
    const homepage = await Homepage.find();
    const tenureYear = await TenureYear.find();
    res.status(200).json({
      aboutData,
      homepage,
      facilities,
      tenureYear,
    });
    // console.log('Data fetched successfully!');
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
};
