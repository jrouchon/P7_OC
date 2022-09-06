import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Auth from "../../pages/Auth";
// import Posts from "../../pages/Posts/index";

const DefaultRoutes = () => {
  return (
    <div>
      <Router>
        <h1>Page test</h1>
        <Routes>
          <Route exact path="/" element={<Auth />} />
          <Route exact path="/auth" element={<Auth />} />
          <Route exact path="/posts" element={<Posts />} />
        </Routes>
      </Router>
    </div>
  );
};

export default DefaultRoutes;