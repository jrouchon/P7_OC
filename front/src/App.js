import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from './pages/Auth/index.jsx';
import Posts from './pages/Post/index.jsx';
import ErrorP from './pages/errorPage.jsx';


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Auth />} />
          <Route exact path="/auth" element={<Auth />} />
          <Route exact path="/posts" element={<Posts />} />
          <Route path="*" element={<ErrorP />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;