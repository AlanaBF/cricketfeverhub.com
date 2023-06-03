import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home/index";
import LiveMatches from "./pages/LiveMatches";
import UpcomingMatches from "./pages/UpcomingMatches/UpcomingMatches";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      {/* Header component */}
      <Header />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LiveMatches" element={<LiveMatches />} />
        <Route path="/UpcomingMatches" element={<UpcomingMatches />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer component */}
      <Footer />
    </Router>
  );
};

export default App;
