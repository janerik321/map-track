import { useState, useRef, useEffect } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import leaflet from "leaflet";

export default function App() {
  const customIcon = new leaflet.Icon({
    iconUrl: "./marker-icon-2x.png",
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    shadowUrl: "./marker-shadow.png",
  });

  interface Coordinates {
    coords: {
      latitude: number;
      longitude: number;
    };
  }

  // let startCoords = [];
  function getCurrentPositionSuccess(pos: Coordinates) {
    // startCoords = [pos.coords.latitude, pos.coords.longitude];
    console.log([pos.coords.latitude, pos.coords.longitude]);
    return [pos.coords.latitude, pos.coords.longitude];
  }
  const [geoLocation, setGeoLocation] = useState([5, 5]);

  // function setCoordinates(pos: Coordinates) {
  //   setGeoLocation([pos.coords.latitude, pos.coords.longitude]);
  // }
  // navigator.geolocation.getCurrentPosition(setCoordinates);

  console.log(
    navigator.geolocation.getCurrentPosition(getCurrentPositionSuccess)
  );

  // const startCoords = [[]]

  // useStates //
  const [geoCoordinates, setGeoCoordinates] = useState([58.9673242, 5.7291641]);
  const [tileSelection, setTileSelection] = useState(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );
  const [attribution, setAttribution] = useState("");
  let geoCoords = useRef([10, 10]);
  const [geoTrackCoordinates, setGeoTrackCoordinates] = useState([
    // [startCoords],
    [58.96838677444153, 5.75613383989598],
  ]);
  /////////////////

  console.log([
    [1.2, 1.2],
    [1.5, 1.5],
  ]);
  console.log(geoTrackCoordinates);

  // geolocation //

  function setCoordinates(pos: Coordinates) {
    setGeoLocation([pos.coords.latitude, pos.coords.longitude]);
    console.log(geoLocation);
  }

  function success(pos: Coordinates) {
    console.log(pos.coords.latitude, pos.coords.longitude);
    setGeoTrackCoordinates((prev) => [
      ...prev,
      [pos.coords.latitude, pos.coords.longitude],
    ]);
    setGeoLocation([pos.coords.latitude, pos.coords.longitude]);
  }

  console.log(geoTrackCoordinates);
  console.log(geoLocation);

  function error() {}

  useEffect(() => {
    let options = {
      enableHighAccuracy: true,
    };
    navigator.geolocation.getCurrentPosition(setCoordinates);
    navigator.geolocation.watchPosition(success, error, options);
  }, []);

  /////////////////

  function TestComponent() {
    const map = useMap();
    map.locate({ setView: true, maxZoom: 17 }),
      (geoCoords.current = [map.getCenter().lat, map.getCenter().lng]);
    console.log(geoCoords.current);
    console.log(geoCoordinates);
    return null;
  }

  function button1() {
    console.log(geoCoords);
    setGeoCoordinates([geoCoords.current[0], geoCoords.current[1]]);
  }
  function button2() {
    setGeoCoordinates([58.9693242, 5.7591641]);
  }

  function button3() {
    setGeoCoordinates((g) => [g[0] + 0.0001, g[1]]);
  }

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
      <MapContainer center={[51.505, -0.09]} zoom={15} scrollWheelZoom={true}>
        <TileLayer attribution={attribution} url={tileSelection} />
        <TestComponent />

        {/* {console.log(geoCoordinates)} */}
        <Marker position={[geoCoordinates[0], geoCoordinates[1]]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={[geoLocation[0], geoLocation[1]]} icon={customIcon}>
          <Popup>
            Geolocate
            <br />
            {/* {geoTrackCoordinates.map((coordinates) => (
              <p>
                {coordinates.lat}
                <br />
                {coordinates.lng}
              </p>
            ))} */}
          </Popup>
          <Polyline
            positions={geoTrackCoordinates as [number, number][]}
          ></Polyline>
        </Marker>
      </MapContainer>
      <div id="buttons">
        <button onClick={button1}>KH</button>
        <button onClick={button2}>2</button>
        <button onClick={button3}>↑</button>
        <button onClick={button4}>֍</button>
        <button onClick={osm}>OSM</button>
        <button onClick={watercolor}>MTBMap</button>
      </div>
    </>
  );
}
