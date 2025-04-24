import clubMain from "../models/clubMain.js";
import Homepage from "../models/general.js";

export const getAllClub = async (req, res) => {
  // console.log("Fetching all clubs...");
  try {
    const club = await clubMain.find({}, 'name img');
    const homepage = await Homepage.find({} , 'clubheroimg');
    // console.log(homepage);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
    res.status(200).json({club, homepage});
  } catch (error) {
    res.status(500).json({ message: "Error fetching the club", error });
  }
};


export const getClubById = async (req, res) => {
  const { name } = req.params;
  // console.log("Fetching club with name:", name); 
  try {
    const club = await clubMain.findOne({ safeName:name }); 
// console.log("Club fetched successfully:", club);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
    res.status(200).json(club);
  } catch (error) {
    res.status(500).json({ message: "Error fetching the club", error });
  }
};
