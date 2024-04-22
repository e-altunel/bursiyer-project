import { useEffect } from "react";
import { useNavigate } from "react-router-dom/dist";
import { UserAuth } from "../context/AuthContext";
import MapPage from "./home-comp/MapPage";
import "./home-comp/home.css";
import Navbar from "./home-comp/Navbar";
import Sidebar from "./home-comp/Sidebar";

export default function Home() {
  const navigate = useNavigate();
  const { user } = UserAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="home-container">
      <div className="navbar-grid container-flex">
        <Navbar />
      </div>
      <div className="sidebar-grid container-flex">
        <Sidebar />
      </div>
      <div className="map-grid container-flex">
        <MapPage />
      </div>
    </div>
  );
}
