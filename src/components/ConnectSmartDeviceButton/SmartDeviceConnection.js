import React from "react";
import { getCurrentUser } from "../UserAuthentication/UserAuthentication";
import { AddAdvancedData, currentDate } from "../JSONUpload/JSONUpload";
import "./ConnectSmartDeviceButton.css";

/**
 * This function generates pseudorandomized data and assigns it to a user and sends it to the database.
 * @returns The array with the generated values packed in json format
 */
export const generatePseudoData = () => {
  let allHealthData = [];
  console.log("Generate Data!");
  let healthData = {};

  for (let i = 0; i < 1; i++) {
    healthData.date = currentDate;
    healthData.time = new Date().toLocaleTimeString("de-DE");
    let minHR = 60;
    let maxHR = 130;
    healthData.heartrate =
      Math.round((minHR + Math.random() * (maxHR - minHR)) * 10) / 10;
    let minTemp = 36;
    let maxTemp = 44;
    healthData.temperature =
      Math.round((minTemp + Math.random() * (maxTemp - minTemp)) * 10) / 10;
    let minSystolic = 60;
    let maxSystolic = 180;
    let minDiastolic = 60;
    let maxDiastolic = 110;
    healthData.bloodpressure = {
      systolic: Math.round(
        minSystolic + Math.random() * (maxSystolic - minSystolic)
      ),
      diastolic: Math.round(
        minDiastolic + Math.random() * (maxDiastolic - minDiastolic)
      ),
    };
    var healthDataJSONString = JSON.stringify(healthData);
    allHealthData.push(JSON.parse(healthDataJSONString));
  }
  console.log(allHealthData);
  let currentUser = getCurrentUser();
  AddAdvancedData(allHealthData, currentUser.uid);
};

/**
 * This component represents a button that if pressed, generates pseudorandom data of body temperature, heartrate and pulse
 * and writes the data into an json file and sends it to the database
 */
const SmartDeviceConnection = () => {
  return (
    <div>
      <button type="button" id="smartDeviceButton" onClick={generatePseudoData}>
        Connect Device
      </button>
    </div>
  );
};

export default SmartDeviceConnection;
