import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactsPage from "./pages/ContactsPage";
import AllClubsPage from "./pages/AllClubsPage";
import EachClubPage from "./pages/ClubPage";
import EachEventPage from "./pages/EventPage";
const BASEURL = process.env.REACT_APP_BASEURL||"sports-board";

function App() {
  return (
    <BrowserRouter basename={`/${BASEURL}`} >
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/clubs" element={<AllClubsPage />} />
          <Route path="/club/:name" element={<EachClubPage />} />
          <Route path="/events" element={<EachEventPage />} />
          <Route path="/event/:id" element={<EachEventPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;