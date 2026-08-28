import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  HomePage,
  ContactsPage,
  AllClubsPage,
  ClubPage,
  EventPage,
  AnnouncementsPage,
  NotFoundPage
} from "./pages";
import Layout from "./components/Layout";
import { Agentation } from "agentation";

const BASEURL = process.env.REACT_APP_BASEURL || "sports-board";

function App() {
  return (
    <>
      <BrowserRouter basename={`${BASEURL}`} >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/clubs" element={<AllClubsPage />} />
            <Route path="/club/:name" element={<ClubPage />} />
            <Route path="/events" element={<EventPage />} />
            <Route path="/event/:id" element={<EventPage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="*" element={<NotFoundPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      {process.env.NODE_ENV === "development" && <Agentation />}
    </>
  );
}

export default App;