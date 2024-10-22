import { BrowserRouter, Route, Routes } from "react-router-dom";
// Import Pages
import HomePage from "./pages/HomePage";
import ContactsPage from "./pages/ContactsPage";
import AllClubsPage from "./pages/AllClubsPage";
import EachClubPage from "./pages/ClubPage";
import AllEventsPage from "./pages/AllEventsPage";
import EachEventPage from "./pages/EventPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/clubs" element={<AllClubsPage />} />
          <Route path="/club/:id" element={<EachClubPage />} />
          <Route path="/events" element={<EachEventPage />} />
          <Route path="/event/:id" element={<EachEventPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
