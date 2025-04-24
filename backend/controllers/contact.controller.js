  import Contacts from "../models/contact.js";
import Homepage from "../models/general.js";

  export const getContacts = async (req, res) => {
      try {
        const contacts = await Contacts.find(); 
        const homepage = await Homepage.find({} , 'contactpageimgurl');
        res.status(200).json({contacts, homepage}); 
      } catch (error) {
        res.status(500).json({ message: 'Error fetching clubs', error });
      }
    };