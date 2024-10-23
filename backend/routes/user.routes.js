import express from 'express';
import { getHomePageData } from '../controllers/homePage.controller.js'; // Import the controller
import { getAllClub, getClubById } from '../controllers/club.controller.js';
import { getContacts } from '../controllers/contact.controller.js';
import { getEventById } from '../controllers/event.controller.js';

const router = express.Router();

// Define the route and use the controller function
router.get('/home', getHomePageData);
router.get('/club/:name', getClubById);
router.get('/event:id', getEventById);
router.get('/contacts', getContacts);
router.get('/allClubs' , getAllClub)

export default router;