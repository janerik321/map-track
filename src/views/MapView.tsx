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
import haversineDistance from "haversine-distance";

export default function MapView() {
  const {
    tileSelection,
    setTileSelection,
    attribution,
    setAttribution,
    geoTrackCoordinates,
    setGeoTrackCoordinates,
    zoomLevel,
    centerMap,
    setCenterMap,
    buttonStyle,
    setButtonStyle,
    distance,
    setDistance,
  }: any = useContext(AppContext);

  const [drawPath, setDrawPath] = useState(true);

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

  // Active button color

  // Getting starting position //

  function getCurrentPositionSuccess(pos: Coordinates) {
    // console.log([pos.coords.latitude, pos.coords.longitude]);
    return [pos.coords.latitude, pos.coords.longitude];
  }

  const [geoLocation, setGeoLocation] = useState([5, 5]);

  navigator.geolocation.getCurrentPosition(getCurrentPositionSuccess);

  // geolocation //

  function setCoordinates(pos: Coordinates) {
    setGeoLocation([pos.coords.latitude, pos.coords.longitude]);
    console.log(geoLocation);
  }

  function success(pos: Coordinates) {
    setGeoTrackCoordinates((prev: any) => [
      ...prev,
      [pos.coords.latitude, pos.coords.longitude],
    ]);
    setGeoLocation([pos.coords.latitude, pos.coords.longitude]);

    console.log(
      haversineDistance(
        { lat: 58.968371, lng: 5.7561325 },
        { lat: 58.968471, lon: 5.7562325 }
      )
    );
    console.log(geoTrackCoordinates);

    // pseudo-kode:
    // setTotalDistance(
    // totalDistance + havesineDistance(2 siste objekter i geoTrackCoordinates)
    // )

    console.log(geoTrackCoordinates);
    console.log(geoLocation);
  }

  function error() {}

  useEffect(() => {
    let options = {
      enableHighAccuracy: true,
    };
    navigator.geolocation.getCurrentPosition(setCoordinates);
    navigator.geolocation.watchPosition(success, error, options);
  }, []);

  /////////////////////////////

  function centerButton() {
    if (!centerMap) {
      setCenterMap(true);
      setButtonStyle({ backgroundColor: "#225", color: "#fffc" });
    } else {
      setCenterMap(false);
      setButtonStyle({});
    }
  }

  function button4() {
    if (!drawPath) {
      setDrawPath(true);
    } else {
      setDrawPath(false);
    }
  }

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

  function reset() {
    // Need two sets of coordinates because the polyline expects at least two
    setGeoTrackCoordinates([
      [geoLocation[0], geoLocation[1]],
      [geoLocation[0], geoLocation[1]],
    ]);

    setDistance(0);
  }

  console.log(geoTrackCoordinates);

  useEffect(() => {
    if (geoTrackCoordinates.length > 3) {
      setDistance(
        (d: any) =>
          d +
          haversineDistance(
            {
              lat: geoTrackCoordinates.slice(-3)[0][0],
              lon: geoTrackCoordinates.slice(-3)[0][1],
            },
            {
              lat: geoTrackCoordinates.slice(-1)[0][0],
              lon: geoTrackCoordinates.slice(-1)[0][1],
            }
          )
      );
    }
    console.log(
      geoTrackCoordinates.slice(-3)[0],
      geoTrackCoordinates.slice(-1)[0]
    );
    console.log(distance);
  }, [geoTrackCoordinates]);

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
          {/* {console.log(geoTrackCoordinates)} */}

          {drawPath && (
            <Polyline
              positions={geoTrackCoordinates as [number, number][]}
            ></Polyline>
          )}
        </Marker>
      </MapContainer>
      <div id="panel">
        <div id="buttons">
          <button onClick={centerButton} style={buttonStyle}>
            Follow
          </button>
          <button onClick={button4}>🖋️</button>
          <button onClick={osm}>OSM</button>
          <button onClick={watercolor}>MTBMap</button>
          <button onClick={reset}>Reset</button>
        </div>
        <div id="distance">
          {distance < 1000 && <div>{Math.round(distance)}m</div>}
          {distance >= 1000 && <div>{(distance / 1000).toFixed(2)}km</div>}
        </div>
      </div>
    </>
  );
}
