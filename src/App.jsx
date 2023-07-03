import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import UpcomingMatchesPage from "./pages/UpcomingMatches/UpcomingMatchesPage";
import NotFound from "./pages/NotFound/NotFound";
import LiveMatchesPage from "./pages/LiveMatches/LiveMatchesPage";
import ScoreCardPage from "./pages/ScorecardPage/ScoreCardPage";
import TeamSelectionPage from "./pages/TeamSelection/TeamSelectionPage"
import "bootstrap/dist/css/bootstrap.min.css";


const App = () => {
  return (
    <Router>
      {/* Header component */}
      <Header />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/TeamSelectionPage" element={<TeamSelectionPage />} />
        <Route path="/LiveMatchesPage" element={<LiveMatchesPage />} />
        <Route path="/scorecard/:matchId" element={<ScoreCardPage />} />
        <Route path="/UpcomingMatchesPage" element={<UpcomingMatchesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer component */}
      <Footer />
    </Router>
  );
};

export default App;