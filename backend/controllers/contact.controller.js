  import Contacts from "../models/contact.js";

  export const getContacts = async (req, res) => {
      try {
        const contacts = await Contacts.find(); 
        res.status(200).json(contacts); 
      } catch (error) {
        res.status(500).json({ message: 'Error fetching clubs', error });
      }
    };