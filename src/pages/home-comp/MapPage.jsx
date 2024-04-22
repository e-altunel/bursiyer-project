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
      zoom={13}
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
      <ChangeView center={center} zoom={13} bounds={bounds} />
    </MapContainer>
  );
}

const ChangeView = ({ center, zoom, bounds }) => {
  const map = useMap();
  map.setView(center, zoom);
  map.setMaxBounds(bounds);
  return null;
};
