import React from "react";
import { createHashRouter, createRoutesFromElements, RouterProvider, Outlet, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import UpcomingMatchesPage from "./pages/UpcomingMatches/UpcomingMatchesPage";
import NotFound from "./pages/NotFound/NotFound";
import LiveMatchesPage from "./pages/LiveMatches/LiveMatchesPage";
import ScoreCardPage from "./pages/ScorecardPage/ScoreCardPage";
import Commentary from './components/Commentary';
import "bootstrap/dist/css/bootstrap.min.css";


const App = () => {
    const router = createHashRouter(
      createRoutesFromElements(
        <Route path="/" element={<Root />}>
        <Route path="/" element={<Home />} />
        <Route path="/LiveMatchesPage" element={<LiveMatchesPage />} />
        <Route path="/scorecard/:matchId" element={<ScoreCardPage />} />
        <Route path="/commentary/:matchId" element={<Commentary />} />
        <Route path="/UpcomingMatchesPage" element={<UpcomingMatchesPage />} />
        <Route path="*" element={<NotFound />} />
        </Route>
  )
  )
  return <RouterProvider router={router} />
}

const Root = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </>
  )
}


export default App