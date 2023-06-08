import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import LiveMatchesPage from "./pages/LiveMatches/LiveMatchesPage";
import UpcomingMatchesPage from "./pages/UpcomingMatches/UpcomingMatchesPage";
import NotFound from "./pages/NotFound/NotFound";
import MatchInfo from "./pages/MatchInfo/MatchInfo";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      {/* Header component */}
      <Header />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LiveMatchesPage" element={<LiveMatchesPage />} />
        <Route path="/UpcomingMatchesPage" element={<UpcomingMatchesPage />} />
        <Route path="/match/:matchId" element={<MatchInfo/>} /> {/* Route for MatchInfo page */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer component */}
      <Footer />
    </Router>
  );
};

export default App;


