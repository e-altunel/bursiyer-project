import "./App.css";
import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./pages/home-comp/Navbar";

function App() {
  //document.ondragstart = () => false;
  //document.oncontextmenu = () => false;
  //document.onselectstart = () => false;

  return (
    <div className="App">
      <div className="navbar-grid container-flex">
        <Navbar />
      </div>
      <div className="main-grid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
