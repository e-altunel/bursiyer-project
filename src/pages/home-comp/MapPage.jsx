import { MapContainer, Polygon, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./home.css";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { onSnapshot, collection, doc, query, where } from "firebase/firestore";
import { useMap } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import { setNeighbourhoods } from "../../reducers/neighbourhoods";
import { setSelectedNeighbourhood } from "../../reducers/selectedNeighbourhood";
import { setSelectedMarker } from "../../reducers/selectedMarker";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

export default function MapPage() {
  const [bounds, setBounds] = useState([
    [40.0, 28.0],
    [42.0, 30.0],
  ]);
  const neighbourhoods = useSelector(
    (state) => state.neighbourhoods.neighbourhoods
  );
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
  const [selectedNeighbourhoodData, setSelectedNeighbourhoodData] =
    useState(null);
  const customIcon = L.icon({
    iconUrl: "https://cdn-icons-png.freepik.com/512/619/619032.png",
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });

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
      collection(db, "data"),
      where(
        "MahalleAdi",
        "==",
        capitalizeFirstLetter(selectedNeighbourhood["MAHALLEADI"])
      )
    );
    onSnapshot(q, (snapshot) => {
      setSelectedNeighbourhoodData(snapshot.docs.map((doc) => doc.data()));
    });
  }, [selectedNeighbourhood]);

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
          .filter((n) => n !== null)}
      {selectedNeighbourhood && (
        <MarkerClusterGroup chunkedLoading>
          {selectedNeighbourhoodData &&
            selectedNeighbourhoodData.map((data, index) => (
              <Marker
                key={index}
                icon={customIcon}
                position={[data["Enlem"], data["Boylam"]]}
                eventHandlers={{
                  click: () => {
                    dispatch(setSelectedMarker(data));
                  },
                }}
              ></Marker>
            ))}
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

function capitalizeFirstLetter(string) {
  return (
    string.charAt(0).toLocaleUpperCase("tr-TR") +
    string.slice(1).toLocaleLowerCase("tr-TR")
  );
}
