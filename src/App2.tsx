// import * as React from "react";
// import * as L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const MAP_TILE = L.tileLayer(
//   `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
//   {
//     attribution:
//       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//   }
// );

// const mapStyles: React.CSSProperties = {
//   overflow: "hidden",
//   width: "100%",
//   height: "100vh",
// };

// function App2() {
//   // Define an object literal with params that will be passed to the map:
//   const mapParams: L.MapOptions = {
//     center: L.latLng(37.0902, -95.7129),
//     zoom: 5,
//     zoomControl: false,
//     maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
//     layers: [MAP_TILE],
//   };

//   // This useEffect hook runs when the component is first mounted:
//   React.useEffect(() => {
//     const map = L.map("map", mapParams);
//   }, []);

//   return (
//     <React.Fragment>
//       <div id="map" style={mapStyles} />
//     </React.Fragment>
//   );
// }

// export default App2;
