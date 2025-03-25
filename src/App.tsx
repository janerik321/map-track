import { useState, useEffect, useRef } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

export default function App() {
  const [geoCoordinates, setGeoCoordinates] = useState([58.9673242, 5.7291641]);
  const [tileSelection, setTileSelection] = useState(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );
  let geoCoords = useRef([10, 10]);

  function TestComponent() {
    const map = useMap();
    map.locate({ setView: true, maxZoom: 16 }),
      console.log(
        // map.fitWorld(),
        // map.locate({ setView: true }),
        map.getCenter()
      );

    geoCoords = [map.getCenter().lat, map.getCenter().lng];
    console.log(geoCoords);

    return null;
  }

  function button1() {
    // useEffect(() => {
    setGeoCoordinates((g) => (g = [58.9949252, 5.7291641]));
    console.log(geoCoordinates);
    // }, []);
  }
  function button2() {
    // useEffect(() => {
    setGeoCoordinates((g) => (g = [58.9673242, 5.7291641]));
    console.log(geoCoordinates);
    // }, []);
  }

  function button3() {
    // useEffect(() => {
    // const map = useMap();
    // console.log(map.getCenter);
    setGeoCoordinates((g) => [g[0] + 0.001, 5.7291641]);
    console.log(geoCoordinates);
    // return null;
    // }, []);
  }

  function osm() {
    setTileSelection("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
  }
  function watercolor() {
    setTileSelection(
      "https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg"
    );
  }

  return (
    <>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={tileSelection}
        />
        <TestComponent />
        {console.log(geoCoordinates)}
        <Marker position={geoCoordinates}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <div id="buttons">
        <button onClick={button1}>1</button>
        <button onClick={button2}>2</button>
        <button onClick={button3}>↑</button>
        <button onClick={osm}>OSM</button>
        <button onClick={watercolor}>Watercolor</button>
      </div>
    </>
  );
}
