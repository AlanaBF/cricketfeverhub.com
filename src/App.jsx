// import React from 'react';
// import PlayerDataComponent from './components/Players/index.jsx';
// import './App.css';

// function App() {
//   return (
//     <div>
//       <h1>Hello</h1>
//       {/* Other components */}
//       <PlayerDataComponent />
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Home, NotFound } from "./pages";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Players from './pages/Players/index'
import NotFound from "./pages/NotFound";
const App = () => {
  return (
    <Router>
      <div>
        <Header />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Players />} />
          {/* <Route path="/Contact" element={<Contact />} /> */}
      
        
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