import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Experiment1 from "./components/Experiment1";
import Experiment2 from "./components/Experiment2";
import Experiment3 from "./components/Experiment3";
import Experiment4 from "./components/Experiment4";
import Home from "./components/Home";
import Experiment5 from "./components/Experiment5";
import Experiment6 from "./components/Experiment6";
import Experiment7 from "./components/Experiment7";
import Experiment8 from "./components/Experiment8";
import Experiment9 from "./components/Experiment9";
import Experiment10 from "./components/Experiment10";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/exp1" element={<Experiment1 />} />
      <Route path="/exp2" element={<Experiment2 />} />
      <Route path="/exp3" element={<Experiment3 />} />
        <Route path="/exp4/*" element={<Experiment4 />} />
      <Route path="/exp5" element={<Experiment5 />} />
      <Route path="/exp6" element={<Experiment6 />} />
      <Route path="/exp7" element={<Experiment7 />} />
      <Route path="/exp8" element={<Experiment8 />} />
      <Route path="/exp9" element={<Experiment9 />} />
      <Route path="/exp10" element={<Experiment10 />} />
    </Routes>
  </Router>
);

export default App;
