import Event from '../models/event.js'; // Import the Event model

// Controller function to fetch an event by ID
export const getEventById = async (req, res) => {
  const { id } = req.params; // Get event ID from URL parameters

  try {
    const event = await Event.findById(id); // Find the event by ID

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event); // Send the event data as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the event', error });
  }
};