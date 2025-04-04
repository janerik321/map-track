import { useMap } from "react-leaflet";

export default function CenterMap() {
  const map = useMap();

  console.log(map.getZoom());
  map.locate({ setView: true, maxZoom: 12 });

  return null;
}
