import { useContext } from "react";
import { AppContext } from "../App";
import { useMap } from "react-leaflet";

export default function CenterMap() {
  const { zoomLevel, setZoomLevel }: any = useContext(AppContext);

  const map = useMap();

  console.log(map.getZoom());
  map.locate({ setView: true, maxZoom: zoomLevel });
  map.on("zoomanim", function (e) {
    console.log(e.zoom);
    setZoomLevel(e.zoom);
  });

  return null;
}
