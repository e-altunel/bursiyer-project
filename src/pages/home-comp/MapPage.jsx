import { MapContainer, Polygon, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./home.css";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { onSnapshot, collection, doc } from "firebase/firestore";
import { useMap } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import { setNeighbourhoods } from "../../reducers/neighbourhoods";
import { setSelectedNeighbourhood } from "../../reducers/selectedNeighbourhood";

export default function MapPage() {
  const [center, setCenter] = useState([41, 29]);
  const [bounds, setBounds] = useState([
    [40.7, 28.5],
    [41.5, 29.5],
  ]);
  const neighbourhoods = useSelector(
    (state) => state.neighbourhoods.neighbourhoods
  );
  const zoom = localStorage.getItem("zoom") ? localStorage.getItem("zoom") : 12;

  const dispatch = useDispatch();

  useEffect(
    () =>
      onSnapshot(collection(db, "neighborhood"), (snapshot) => {
        dispatch(setNeighbourhoods(snapshot.docs.map((doc) => doc.data())));
      }),
    [dispatch]
  );

  useEffect(() => {
    onSnapshot(doc(db, "settings", "map_settings"), (snapshot) => {
      const map_settings = snapshot.data();
      if (!map_settings) return;
      setCenter([map_settings.center._lat, map_settings.center._long]);
      setBounds([
        [map_settings.max_bounds[0]._lat, map_settings.max_bounds[0]._long],
        [map_settings.max_bounds[1]._lat, map_settings.max_bounds[1]._long],
      ]);
    });
  }, []);

  return (
    <MapContainer
      className="map-container"
      maxBounds={bounds}
      center={center}
      zoom={zoom}
      maxZoom={16}
      minZoom={11}
    >
      <TileLayer
        attribution='&copy <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap </a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {neighbourhoods &&
        neighbourhoods.map((n, index) => (
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
        ))}
      <ChangeView center={center} bounds={bounds} />
      <SaveView />
      <DrawPolygon />
    </MapContainer>
  );
}

const ChangeView = ({ center, bounds }) => {
  const map = useMap();
  map.setView(center, map.getZoom(), { animate: false });
  map.setMaxBounds(bounds, { animate: false });
  return null;
};

const SaveView = () => {
  const map = useMap();
  useEffect(() => {
    map.on("moveend", () => {
      localStorage.setItem("zoom", map.getZoom());
    });
  }, [map]);
  return null;
};

const DrawPolygon = () => {
  const map = useMap();
  return null;
};
