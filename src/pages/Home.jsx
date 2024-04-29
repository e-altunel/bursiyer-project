import { useEffect } from "react";
import { useNavigate } from "react-router-dom/dist";
import { UserAuth } from "../context/AuthContext";
import MapPage from "./home-comp/MapPage";
import "./home-comp/home.css";
import Navbar from "./home-comp/Navbar";
import Sidebar from "./home-comp/Sidebar";
import { useDispatch } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { setAdmin } from "../reducers/uiSett";

export default function Home() {
  const navigate = useNavigate();
  const { user } = UserAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
      if (doc.exists()) {
        dispatch(setAdmin(doc.data().admin));
      } else {
        dispatch(setAdmin(false));
      }
    });
    return () => unsubscribe();
  }, []);

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
