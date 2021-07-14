import React, { useEffect, useState } from "react";
import firebase from "firebase";
import Firebase from "../../Firebase";
import L from "leaflet";
import "leaflet.heat";
import "leaflet.heat/dist/leaflet-heat.js";
import "leaflet/dist/leaflet.css";
import moment from "moment/moment.js";
import places from "./Zipcodes_de.js";
import "./HeatMap.css";
import { IconButton, Tooltip } from "@material-ui/core";
import { FcInfo } from "react-icons/fc";
const db = firebase.firestore();
var points = [];

const options = [
  { value: "userMap", label: "Unsere Held*innen kommen aus:" },
  {
    value: "feverMap",
    label: "Held*innen mit kürzlich erhöhter Körpertemperatur:",
  },
];
/**
 * This function looks at the users zipcode and body temperature
 * and maps the zipcode to coordinates for the HeatMap
 */
const mapZipcodeToCoordinates = async (mapType) => {
  points = [];
  console.log(mapType);
  var isFeverMap = mapType === "feverMap" ? true : false;
  console.log(isFeverMap);
  const configFile = await db.collection("configurations").doc("config").get();
  const userDataSnapshot = await db.collection("userdata").get();
  for (const doc of userDataSnapshot.docs) {
    var userZipcode;
    var validCount = false;
    const userBasedataSnapshot = await doc.ref
      .collection("basedata")
      .orderBy("timestamp", "desc")
      .limit(1)
      .get();

    // Look at advanceddata if the user had fever the last days
    if (isFeverMap) {
      const feverThreshold = configFile.data().feverThreshold;
      var feverSinceDays = configFile.data().feverSinceDays;
      const startDate = moment()
        .subtract(feverSinceDays, "days")
        .format("YYYY-MM-DD");
      await doc.ref
        .collection("advanceddata")
        .orderBy("date", "desc")
        .where("date", ">=", startDate)
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            if (doc.data().temperature >= feverThreshold) {
              validCount = true;
            }
          });
        });
    } else validCount = true;

    // If the user is valid for the heatmap add his
    if (!userBasedataSnapshot.empty && validCount) {
      userBasedataSnapshot.docs.forEach((doc) => {
        userZipcode = doc.data().zipcode;
        if (typeof userZipcode !== "undefined") {
          var coordinates = [];
          var zipFound = false;
          Object.keys(places).some((key) => {
            if (places[key].zipcode == userZipcode) {
              zipFound = true;
              coordinates = [places[key].latitude, places[key].longitude];
              points.push(coordinates);
            }
            return zipFound;
          });
          // Object.keys(places).forEach((key) => {
          //   if (!zipFound && places[key].zipcode === userZipcode) {
          //     coordinates = [places[key].latitude, places[key].longitude];
          //     points.push(coordinates);
          //     zipFound = true;
          //   }
          // });
        }
      });
    }
  }
};

/* function onchange(e) {

  window.location.reload();
} */
//var startViewPos;
var map;
async function buildMap(mapType) {
  // Load config file fromd database.
  const configFile = await db.collection("configurations").doc("config").get();
  // Set starting view for heatmap.
  const startViewPos = [
    configFile.data().startView.latitude,
    configFile.data().startView.longitude,
  ];

  document.getElementById("map").innerHTML = "<div id='map'/>";

  // Initialize the map
  if (typeof map !== "undefined") map.remove();
  map = L.map("map").setView(startViewPos, 6);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Load in the coordinates from users valid to the heatmap
  await mapZipcodeToCoordinates(mapType);
  const p = points
    ? points.map((p) => {
        return [p[0], p[1]];
      })
    : [];

  // Add the heatLayer with the coordinates to the map
  L.heatLayer(p, { minOpacity: 0.15, maxZoom: 15, radius: 30 }).addTo(map);
}
/**
 * Creates and exports a HeatMap generated from users
 * zipcodes and if they had a fever the last few days
 */
export default function HeatMap() {
  const [selectedValue, setSelectedValue] = useState(options[0]);

  useEffect(async () => {
    buildMap("userMap");
  }, []);

  const handleChange = async (obj) => {
    await setSelectedValue(obj);
    buildMap(obj);
  };

  return (
    <div>
      <div className="selectTitle">
        <span>
          <h2>
            <Tooltip
              title={
                <span>
                  <h3>Hier können Sie zwischen zwei Karten aussuchen.</h3>
                  <br />
                  <h3>
                    Es gibt eine Karte, welche die Herkunft unserer Held*innen
                    anzeigt. Sie sollten auch Ihren Ort auf der Karte finden
                    können.
                  </h3>
                  <br />
                  <h3>
                    Die zweite Karte zeigt, die Orte der Held*innen mit erhöhte
                    Körpertemperatur in der letzten Woche an.
                  </h3>
                </span>
              }
              placement="bottom-start"
              enterDelay={0}
              enterTouchDelay={50}
              leaveTouchDelay={30000}
              arrow="true"
            >
              <IconButton>
                <FcInfo size={50} />
              </IconButton>
            </Tooltip>
            Auswahl:
          </h2>
        </span>
      </div>
      <div className="selectDiv">
        <select
          className="selectSection"
          defaultValue={selectedValue}
          onChange={(e) => handleChange(e.currentTarget.value)}
        >
          <option value="userMap">Unsere Held*innen kommen aus:</option>
          <option value="feverMap">
            Held*innen mit kürzlich erhöhter Körpertemperatur:
          </option>
        </select>
      </div>
      <div className="mapDiv">
        <div id="map"></div>
      </div>
    </div>
  );
}
