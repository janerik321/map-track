// import "leaflet/dist/leaflet.css";

// import L from "leaflet";
// import { useEffect, useState, useRef } from "react";

// export default function MapView() {
//   const [queryData, setQueryData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const centerCoordinates = useRef({ lat: 10, lng: 10 });

//   useEffect(() => {
//     const container = L.DomUtil.get("map");
//     // console.log(container);

//     if (container != null) {
//       container._leaflet_id = null;
//     }

//     const map = L.map("map").fitWorld();
//     container._leaflet_id = "map";

//     map.dragging.enable();

//     const Stadia_StamenWatercolor = L.tileLayer(
//       "https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.{ext}",
//       {
//         minZoom: 1,
//         maxZoom: 16,
//         attribution:
//           '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//         ext: "jpg",
//       }
//     );

//     const openStreetMap = L.tileLayer(
//       "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
//       {
//         maxZoom: 19,
//         attribution:
//           '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//       }
//     ).addTo(map);

//     openStreetMap.addTo(map);
//     // Stadia_StamenWatercolor.addTo(map);

//     map.locate({ setView: true, maxZoom: 16 });
//     // map.addControl(new L.Control.Gps());
//     const marker = L.marker([58.9686, 5.7552]).addTo(map);
//     const circle = L.circle([58.9686, 5.7552], {
//       color: "red",
//       fillColor: "#70f",
//       fillOpacity: 0.5,
//       radius: 50,
//     }).addTo(map);

//     centerCoordinates.current = map.getCenter();
//     console.log(map.getCenter());
//     // console.log(centerCoordinates.current);
//     // console.log(L);
//   }, []);

//   return <h1>MapView</h1>;
// }
