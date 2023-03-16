import React from 'react'
import Home from "./pages/home/Home"
import Register from "./pages/register/Register";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";


function App() {
  return (
    <Router>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/register" element={ <Register/>}/>
    </Routes>
    </Router>
    
  );
}

export default App;
