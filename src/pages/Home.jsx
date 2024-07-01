import { useEffect } from "react";
import { useNavigate } from "react-router-dom/dist";
import { UserAuth } from "../context/AuthContext";
import MapPage from "./home-comp/MapPage";
import "./home-comp/home.css";
import Sidebar from "./home-comp/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase";
import { setAdmin /*setSidebarBaseSize*/ } from "../reducers/uiSett";
import LeftBar from "./home-comp/LeftBar";
import { ResizableBox } from "react-resizable";
import { setGraphGroupNeighbourhood } from "../reducers/titles";

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
  }, [dispatch, user]);

  useEffect(
    () =>
      onSnapshot(collection(db, "neighborhoods_titles"), (snapshot) => {
        dispatch(
          setGraphGroupNeighbourhood(snapshot.docs.map((doc) => doc.data()))
        );
      }),
    [dispatch]
  );

  const darkMode = useSelector((state) => state.uiSett.darkMode);
  const sidebar_const_size = useSelector(
    (state) => state.uiSett.sidebar_const_size
  );

  return (
    <div
      className={"home-container full-box"}
      style={{
        backgroundColor: darkMode ? "var(--dark-bg)" : "var(--light-bg)",
      }}
    >
      <ResizableBox
        width={sidebar_const_size * (window.innerWidth / 100)}
        height={Infinity}
        resizeHandles={["e"]}
        style={{
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
          zIndex: 1000,
          height: "100vh",
          direction: "ltr",
        }}
        minConstraints={[
          (sidebar_const_size - 15) * (window.innerWidth / 100),
          0,
        ]}
        maxConstraints={[
          (sidebar_const_size + 15) * (window.innerWidth / 100),
          Infinity,
        ]}
      >
        <span
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100vh",
            justifyContent: "stretch",
            width: "100%",
          }}
        >
          <div className="leftbar-grid">
            <LeftBar />
          </div>
          <div className="sidebar-grid">
            <Sidebar />
          </div>
        </span>
      </ResizableBox>
      <div className="map-grid container-flex">
        <MapPage />
      </div>
    </div>
  );
}
