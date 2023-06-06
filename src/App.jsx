import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import LiveMatches from "./pages/LiveMatches/LiveMatches";
import UpcomingMatchesPage from "./pages/UpcomingMatches/UpcomingMatchesPage";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
    <Router>
      {/* Header component */}
      <Header />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LiveMatches" element={<LiveMatches />} />
        <Route path="/UpcomingMatchesPage" element={<UpcomingMatchesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer component */}
      <Footer />
    </Router>
  );
};

export default App;
