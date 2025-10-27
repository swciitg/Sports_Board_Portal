import Announcement from "../models/announcement.js";

export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });
    const formatted = announcements.map(a => ({
      title: a.title,
      description: a.description,
      date: a.date,
      link: a.link || null,
    }));
    return res.status(200).json({ announcements: formatted });
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return res.status(500).json({ message: 'Error fetching announcements', error });
  }
};
