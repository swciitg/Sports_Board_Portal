import clubMain from "../models/clubMain.js";

export const getAllClub = async (req, res) => {


  try {
    const club = await clubMain.find();


    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    res.status(200).json(club); // Return the club data as JSON
  } catch (error) {
    res.status(500).json({ message: "Error fetching the club", error });
  }
};


// Controller to fetch a club by name
export const getClubById = async (req, res) => {
  const { name } = req.params;
  try {
    const club = await clubMain.findOne({ name:name }); // Match the name exactly

    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    res.status(200).json(club); // Return the club data as JSON
  } catch (error) {
    res.status(500).json({ message: "Error fetching the club", error });
  }
};
