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

  //////////////////////////////////////////////////////////////
  interface Coordinates {
    coords: {
      latitude: number;
      longitude: number;
    };
  }

  function success(pos: Coordinates) {
    console.log(pos.coords.latitude, pos.coords.longitude);
  }
  //////////////////////////////////////////////////////////////

  function TestComponent() {
    const map = useMap();
    map.locate({ setView: true, maxZoom: 16 }), //4
      // console.log(
      //   // map.fitWorld(),
      //   // map.locate({ setView: true }),
      //   map.getCenter()
      // );

      (geoCoords.current = [map.getCenter().lat, map.getCenter().lng]); //3
    console.log(geoCoords.current);
    console.log(geoCoordinates);
    return null;
  }

  function button1() {
    console.log(geoCoords);
    setGeoCoordinates(
      // (g) => (g = [geoCoords.current[0], geoCoords.current[1]])
      [geoCoords.current[0], geoCoords.current[1]] //2
    );
    // console.log(geoCoordinates);
  }
  function button2() {
    setGeoCoordinates((g) => (g = [58.9693242, 5.7591641]));
  }

  function button3() {
    setGeoCoordinates((g) => [g[0] + 0.0001, g[1]]);
  }

  function button4() {
    navigator.geolocation.watchPosition(success);
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

        {/* {console.log(geoCoordinates)} */}
        <Marker position={[geoCoordinates[0], geoCoordinates[1]]}>
          {/*1*/}
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <div id="buttons">
        <button onClick={button1}>KH</button>
        <button onClick={button2}>2</button>
        <button onClick={button3}>↑</button>
        <button onClick={button4}>֍</button>
        <button onClick={osm}>OSM</button>
        <button onClick={watercolor}>Watercolor</button>
      </div>
    </>
  );
}
