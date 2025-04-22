import { useContext } from "react";
import { AppContext } from "../App";
import { useMap } from "react-leaflet";

export default function CenterMap() {
  const {
    zoomLevel,
    setZoomLevel,
    centerMap,
  }: // setCenterMap,
  // setButtonStyle,
  any = useContext(AppContext);

  const map = useMap();

  if (centerMap) {
    map.locate({ setView: true, maxZoom: zoomLevel });
  }

  // Trigger if user zooms in or out. Get current zoom and update zoomLevel to prevent map from going back to previous zoom level when map rerenders.
  map.on("zoomanim", function (e) {
    setZoomLevel(e.zoom);
    // map.stopLocate();
    // setCenterMap(false);
    // setButtonStyle({});
  });

  // map.on("movestart", function () {
  //   map.stopLocate();
  //   setCenterMap(false);
  // });

  return null;
}
