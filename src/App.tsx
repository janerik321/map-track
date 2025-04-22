import { useState, createContext } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import MapView from "./views/MapView";

export const AppContext = createContext({});

export default function App() {
  const [tileSelection, setTileSelection] = useState(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );
  const [attribution, setAttribution] = useState(
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  );

  const [geoTrackCoordinates, setGeoTrackCoordinates] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(null);
  const [centerMap, setCenterMap] = useState(true);
  const [buttonStyle, setButtonStyle] = useState({
    backgroundColor: "#225",
    color: "#fffc",
  });

  return (
    <AppContext.Provider
      value={{
        tileSelection,
        setTileSelection,
        attribution,
        setAttribution,
        geoTrackCoordinates,
        setGeoTrackCoordinates,
        zoomLevel,
        setZoomLevel,
        centerMap,
        setCenterMap,
        buttonStyle,
        setButtonStyle,
      }}
    >
      <MapView />
    </AppContext.Provider>
  );
}
