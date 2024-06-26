import { MapContainer, /*Polygon, */ TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./home.css";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { onSnapshot, collection, doc, query, where } from "firebase/firestore";
import { useMap } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import { setNeighbourhoods } from "../../reducers/neighbourhoods";
import {
  setSelectedNeighbourhood,
  setSelectedNeighbourhoodData,
  setSelectedNeighbourhoodStats,
} from "../../reducers/selectedNeighbourhood";
import { setSelectedMarker } from "../../reducers/selectedMarker";
import { setTitleGroup, setTitles } from "../../reducers/titles";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

export default function MapPage() {
  const [bounds, setBounds] = useState([
    [40.0, 28.0],
    [42.0, 30.0],
  ]);
  //const neighbourhoods = useSelector(
  //  (state) => state.neighbourhoods.neighbourhoods
  //);
  const zoom = localStorage.getItem("zoom") ? localStorage.getItem("zoom") : 12;
  const [center, setCenter] = useState(
    localStorage.getItem("center")
      ? JSON.parse(localStorage.getItem("center"))
      : null
  );
  const [gotData, setGotData] = useState(false);
  const selectedNeighbourhood = useSelector(
    (state) => state.selectedNeighbourhood.selectedNeighbourhood
  );
  const selectedNeighbourhoodData = useSelector(
    (state) => state.selectedNeighbourhood.selectedNeighbourhoodData
  );
  const customIcon = L.icon({
    iconUrl:
      "https://firebasestorage.googleapis.com/v0/b/bursiyer-project.appspot.com/o/homeIcon.png?alt=media&token=fb2e4ba6-4d70-49b8-9513-12321f968c04",
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });
  const selectedMarker = useSelector(
    (state) => state.selectedMarker.selectedMarker
  );

  const dispatch = useDispatch();
  dispatch(setSelectedNeighbourhood(true));

  useEffect(
    () =>
      onSnapshot(collection(db, "neighborhoods"), (snapshot) => {
        dispatch(setNeighbourhoods(snapshot.docs.map((doc) => doc.data())));
      }),
    [dispatch]
  );

  useEffect(() => {
    onSnapshot(doc(db, "settings", "map_settings"), (snapshot) => {
      const map_settings = snapshot.data();
      if (!map_settings) return;
      if (center === null)
        setCenter([map_settings.center._lat, map_settings.center._long]);
      setBounds([
        [
          map_settings.max_bounds[0]._lat + 0.1,
          map_settings.max_bounds[0]._long - 0.1,
        ],
        [
          map_settings.max_bounds[1]._lat - 0.1,
          map_settings.max_bounds[1]._long + 0.1,
        ],
      ]);
      setGotData(true);
    });
  }, [center]);

  useEffect(() => {
    if (!selectedNeighbourhood) return;
    const q = query(
      collection(db, "buildings_list"),
      where("MAHALLEKOD", "==", 50331) //selectedNeighbourhood["MAHALLEKOD"])
    );
    onSnapshot(q, (snapshot) => {
      dispatch(
        setSelectedNeighbourhoodData(snapshot.docs.map((doc) => doc.data()))
      );
    });
    onSnapshot(doc(db, "neighborhoods", "50331"), (snapshot) => {
      dispatch(setSelectedNeighbourhoodStats(snapshot.data()));
    });
  }, [selectedNeighbourhood, dispatch]);

  useEffect(() => {
    if (!selectedMarker) return;
    onSnapshot(collection(db, "columns"), (snapshot) => {
      dispatch(setTitles(snapshot.docs.map((doc) => doc.data())));
    });
  }, [selectedMarker, dispatch]);

  useEffect(() => {
    if (!selectedMarker) return;
    onSnapshot(collection(db, "titles"), (snapshot) => {
      dispatch(setTitleGroup(snapshot.docs.map((doc) => doc.data())));
    });
  }, [selectedMarker, dispatch]);

  return (
    <MapContainer
      className="map-container"
      maxBounds={bounds}
      center={center ? center : [41.0, 28.9]}
      zoom={zoom}
      maxZoom={18}
      minZoom={11}
    >
      <TileLayer
        attribution='&copy <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap </a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/*
      {neighbourhoods &&
        neighbourhoods
          .map((n, index) =>
            selectedNeighbourhood && selectedNeighbourhood === n ? null : (
              <Polygon
                key={index}
                pathOptions={{ color: "red" }}
                positions={n.wkt.map((w) => [w._lat, w._long])}
                eventHandlers={{
                  click: () => {
                    dispatch(setSelectedNeighbourhood(n));
                  },
                }}
              />
            )
          )
          .filter((n) => n !== null)}*/}
      {selectedNeighbourhood && (
        <MarkerClusterGroup chunkedLoading>
          {selectedNeighbourhoodData &&
            selectedNeighbourhoodData
              .map((data, index) =>
                index < 10 ? (
                  <Marker
                    key={index}
                    icon={customIcon}
                    position={[data["ENLEM"], data["BOYLAM"]]}
                    eventHandlers={{
                      click: () => {
                        dispatch(setSelectedMarker(data));
                      },
                    }}
                  ></Marker>
                ) : null
              )
              .filter((n) => n !== null)}
        </MarkerClusterGroup>
      )}
      <ChangeView center={center} bounds={bounds} gotData={gotData} />
      <SaveView />
      <DrawPolygon />
    </MapContainer>
  );
}

const ChangeView = ({ center, bounds, gotData }) => {
  const map = useMap();
  if (!gotData) return null;
  map.setView(center, map.getZoom(), { animate: false });
  map.setMaxBounds(bounds, { animate: false });
  return null;
};

const SaveView = () => {
  const map = useMap();
  useEffect(() => {
    map.on("moveend", () => {
      localStorage.setItem("zoom", map.getZoom());
      localStorage.setItem("center", JSON.stringify(map.getCenter()));
    });
  }, [map]);
  return null;
};

const DrawPolygon = () => {
  return null;
};
