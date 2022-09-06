import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
// import Posts from "./pages/Posts/index";  <Route path="/posts" element={<Posts />} />

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <h1>Page principale</h1>
        <Routes>
          <Route exact path="/" element={<Auth />} />
          <Route exact path="/auth" element={<Auth />} />
        </Routes>
      </Router>
  </React.StrictMode>
);


