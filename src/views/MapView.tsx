import { useState, useEffect, useContext } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import leaflet from "leaflet";
import CenterMap from "../components/CenterMap";
import { AppContext } from "../App";

export default function MapView() {
  const {
    tileSelection,
    setTileSelection,
    attribution,
    setAttribution,
    geoTrackCoordinates,
    setGeoTrackCoordinates,
    zoomLevel,
  }: any = useContext(AppContext);

  // Marker icon //

  const customIcon = new leaflet.Icon({
    iconUrl: "./marker-icon-2x.png",
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    shadowUrl: "./marker-shadow.png",
  });

  // Interface //

  interface Coordinates {
    coords: {
      latitude: number;
      longitude: number;
    };
  }

  // Getting starting position //

  function getCurrentPositionSuccess(pos: Coordinates) {
    return [pos.coords.latitude, pos.coords.longitude];
  }
  const [geoLocation, setGeoLocation] = useState([5, 5]);

  navigator.geolocation.getCurrentPosition(getCurrentPositionSuccess);

  // useStates //

  // geolocation //

  function setCoordinates(pos: Coordinates) {
    setGeoLocation([pos.coords.latitude, pos.coords.longitude]);
  }

  function success(pos: Coordinates) {
    setGeoTrackCoordinates((prev: any) => [
      ...prev,
      [pos.coords.latitude, pos.coords.longitude],
    ]);
    setGeoLocation([pos.coords.latitude, pos.coords.longitude]);
  }

  function error() {}

  useEffect(() => {
    let options = {
      enableHighAccuracy: true,
    };
    navigator.geolocation.getCurrentPosition(setCoordinates);
    navigator.geolocation.watchPosition(success, error, options);
  }, []);

  function button4() {}

  function osm() {
    setTileSelection("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
    setAttribution(
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    );
  }
  function watercolor() {
    setTileSelection("http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png");
    setAttribution(
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp; USGS'
    );
  }

  return (
    <>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={zoomLevel}
        scrollWheelZoom={true}
      >
        <CenterMap />
        <TileLayer attribution={attribution} url={tileSelection} />

        <Marker position={[geoLocation[0], geoLocation[1]]} icon={customIcon}>
          <Popup>Geolocate</Popup>
          <Polyline
            positions={geoTrackCoordinates as [number, number][]}
          ></Polyline>
        </Marker>
      </MapContainer>
      <div id="buttons">
        <button>Center</button>
        <button onClick={button4}>🖋️</button>
        <button onClick={osm}>OSM</button>
        <button onClick={watercolor}>MTBMap</button>
      </div>
    </>
  );
}
