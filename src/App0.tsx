import { useEffect, useState, useRef } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import L from "leaflet";
import MapView from "./views/MapView";

function App() {
  const [queryData, setQueryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const centerCoordinates = useRef({ lat: 10, lng: 10 });
  // const [map, setMap] = useState(L.map("map").fitWorld());

  // useEffect(() => {
  //   setLoading(true);
  //   const fetchOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: "[out:json];node[amenity=drinking_water](58.75572130892272,5.524390487670898,58.973231941798524,5.762779712677002);out;",
  //   };
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://overpass-api.de/api/interpreter",
  //         fetchOptions
  //       );
  //       const data = await response.json();
  //       setQueryData(data);
  //       // console.log(response);
  //       // console.log(data);
  //     } catch (err) {
  //       console.log(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // interface QueryElements {
  //   id: number;
  //   lat: number;
  //   lon: number;
  //   tags: {
  //     name: string;
  //     operator: string;
  //     fee: string;
  //     capacity: number;
  //   };
  // }

  return (
    <>
      <div id="map"></div>
      {console.log("test")}
      <div>test</div>

      {/* {queryData && !loading && (
        <>
          {queryData.elements.map(({ id, lat, lon, tags }: QueryElements) =>
            console.log(id, lat, lon, tags)
          )}
        </>
      )} */}

      <MapView />
    </>
  );
}

export default App;
