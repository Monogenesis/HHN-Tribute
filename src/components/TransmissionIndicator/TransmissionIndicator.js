import React, { useEffect } from "react";
import { CgData } from "react-icons/cg";
import { IconContext } from "react-icons";
import { generatePseudoData } from "../ConnectSmartDeviceButton/SmartDeviceConnection.js";
import { getIsDeviceConnected } from "../HealthTrackerButton/HealthTrackerButton";
var isTransmitting = false;
var transmittingIntervalInSeconds = 10;

const toggleTransmission = () => {
  setTimeout(() => {
    toggle();
    setTimeout(() => {
      toggle();
    }, 3500);
  }, 500);
};
const toggle = () => {
  var x = document.getElementById("transmissionIndicator");
  if (x !== null) {
    console.log(RGBToHex(x.style.color).toLocaleUpperCase());
    if (RGBToHex(x.style.color).toLocaleUpperCase() === "#7CFC00") {
      x.style.color = "#808080";
    } else if (RGBToHex(x.style.color).toLocaleUpperCase() === "#808080") {
      x.style.color = "#7CFC00";
    }
  }
};

function RGBToHex(rgb) {
  // Choose correct separator
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(")")[0].split(sep);

  let r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}

const TransmissionIndicator = () => {
  useEffect(() => {
    document.getElementById("transmissionIndicator").style.color =
      getIsDeviceConnected() == "false" ? "#152028" : "#808080";
    setInterval(() => {
      var isConnected = localStorage.getItem("isDeviceConnected");
      if (isConnected !== null && isConnected === "true") {
        console.log("Sending data...");
        toggleTransmission();
        generatePseudoData();
      }
    }, 1000 * transmittingIntervalInSeconds);
  }, []);
  return (
    <div
      style={{ color: "#152028", display: "block" }}
      id="transmissionIndicator"
    >
      <IconContext.Provider value={{ display: "block", size: "40px" }}>
        <CgData></CgData>
      </IconContext.Provider>
    </div>
  );
};

export default TransmissionIndicator;
