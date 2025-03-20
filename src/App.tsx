import { useEffect, useState } from "react";
import "./App.css";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
// import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  // const map = useMapEvents

  const [queryData, setQueryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "[out:json];node[amenity=drinking_water](58.75572130892272,5.524390487670898,58.973231941798524,5.762779712677002);out;",
    };
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://overpass-api.de/api/interpreter",
          fetchOptions
        );
        const data = await response.json();
        setQueryData(data);
        // console.log(response);
        // console.log(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // interface elements {
  //   id: number;
  //   lat: number;
  //   lon: number;
  //   tags: object;
  //   type: string;
  // }

  interface QueryElements {
    id: number;
    lat: number;
    lon: number;
    tags: {
      name: string;
      operator: string;
      fee: string;
      capacity: number;
    };
  }

  interface QueryDataType {
    elements: object;
    generator: string;
    osm3s: object;
    version: number;
  }
  return (
    <>
      <MapContainer
        center={[58.968375, 5.756165]}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <>
          <>
            {/* <Marker position={[58.968375, 5.756165]}>
              <Popup>Hello</Popup>
            </Marker> */}
          </>
        </>
        {/* <Marker position={[58.968205, 5.756005]}></Marker> */}
        {queryData && !loading && (
          <>
            {console.log(queryData)}
            {/* {interface id} */}

            {queryData.elements.map(({ id, lat, lon, tags }: QueryElements) => (
              // {console.log(lat, lon)};

              <Marker position={[lat, lon]} key={id}>
                <Popup>
                  <p>{tags.name}</p>
                  {/* <br /> */}
                  {tags.operator}
                  <br />
                  Fee: {tags.fee}
                  <br />
                  Capacity: {tags.capacity}
                </Popup>
              </Marker>
            ))}
          </>
        )}
      </MapContainer>
    </>
  );
}

export default App;
