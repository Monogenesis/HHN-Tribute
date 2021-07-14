import React from "react";
import HeatMap from "../components/HeatMap/HeatMap.js";
import "./pagestyles/LiveMap.css";

const options = [
  { value: "userMap", label: "Unsere Held*innen kommen aus:" },
  {
    value: "feverMap",
    label: "Held*innen mit kürzlich erhöhter Körpertemperatur:",
  },
];

const LiveMap = () => {
  return (
    <body>
      <div>
        <h1 className="LivemapTitle">Heldenkarte</h1>
      </div>
      <div
        id="heatMap"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <div>
          <HeatMap></HeatMap>
        </div>
      </div>
    </body>
  );
};

export default LiveMap;
