import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from './pages/Home/index'
import MatchSchedule from "./pages/MatchSchedule";
import NotFound from "./pages/NotFound";
const App = () => {
  return (
    <Router>
      <div>
        <Header />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/MatchSchedule" element={<MatchSchedule />} />
      
        
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;