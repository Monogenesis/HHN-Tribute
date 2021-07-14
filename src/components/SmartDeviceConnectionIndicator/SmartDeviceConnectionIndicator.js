import React, { useEffect } from "react";
import { CgSmartphoneShake } from "react-icons/cg";
import { IconContext } from "react-icons";

var isConnected =
  localStorage.getItem("isDeviceConnected") !== null
    ? localStorage.getItem("isDeviceConnected")
    : "false";

/**
 * This function toggles the view of the element indicating the smartdevice connection
 *
export const toggleIndicator = () => {
  var x = document.getElementById("connectIndicator");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
};
*/

/**
 * This function returns a html element that indicates whether a smartdevice is connected or not
 * @returns HTML element indicating smartdevice activity
 */
const SmartDeviceConnectionIndicator = () => {
  isConnected =
    localStorage.getItem("isDeviceConnected") !== null
      ? localStorage.getItem("isDeviceConnected")
      : false;
  console.log(typeof isConnected);
  return (
    <div
      style={{ display: isConnected === "true" ? "none" : "block" }}
      id="connectIndicator"
    >
      <IconContext.Provider value={{ color: "white", size: "50px" }}>
        <CgSmartphoneShake></CgSmartphoneShake>
      </IconContext.Provider>
    </div>
  );
};

export default SmartDeviceConnectionIndicator;
