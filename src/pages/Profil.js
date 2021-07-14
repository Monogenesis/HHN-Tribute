import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./pagestyles/Profil.css";
import ReturnDataButton from "../components/ReturnData/ReturnData";
import DataDonation from "./DataDonation";
import GatherBaseData from "../components/GatherBaseData/GatherBaseData.js";
import { CheckRegistered } from "../components/RegistrationCheck/RegistrationCheck";
import { getCurrentUser } from "../components/UserAuthentication/UserAuthentication";
import HealthTrackerButton from "../components/HealthTrackerButton/HealthTrackerButton";
import TransmissionIndicator from "../components/TransmissionIndicator/TransmissionIndicator";

import { IconButton, Tooltip } from "@material-ui/core";
import { FcInfo } from "react-icons/fc";
import { CgData } from "react-icons/cg";
import { IconContext } from "react-icons";

const firebase = require("firebase");
require("firebase/firestore");

const db = firebase.firestore().collection("userdata");
let currentDate = new Date().toISOString().slice(0, 10);

var userID;
var currentGender;
var currentAge;
var currentWeight;
var currentHeight;
var currentZipCode;
var lastTimestamp;

const Profil = () => {
  useEffect(() => {
    document.getElementById("newDataDonation").disabled = true;
  }, []);
  return (
    <header>
      <section className="Profil">
        <div id="root">
          <section className="ProfileSection">
            <h1 className="ProfilTitle">Datenspende</h1>
          </section>
          <section className="UserIDSection">
            <h2 className="UserIDTitle">
              <Tooltip
                title={
                  <span>
                    <h3>
                      Hier können Sie ihr persönliches Pseudonym einsehen und
                      ihre Stammdaten aktualisieren. Das Pseudonym dient dazu
                      ihre Identität zu verschleiern.
                    </h3>
                    <br />
                    <h3>
                      Sie können auch eine Pseudoverbindung zu einem
                      Gesundheitstracker herrstellen, um uns regelmäßig
                      zusätztliche Daten wie z.B. Körpertemperatur und
                      Herzfrequenz zu spenden.
                    </h3>
                    <br />
                    <h3>
                      Wenn Sie dieses Symbol
                      <IconContext.Provider
                        value={{ color: "#7CFC00", size: "20px" }}
                      >
                        <CgData></CgData>
                      </IconContext.Provider>
                      in der oberen Leiste sehen, werden Daten auf unsere
                      Datenbank geschrieben.
                    </h3>
                    <br />
                    <h3>
                      Diese Daten werden zufällig generiert und dienen dazu
                      andere Funktionen wie die Heldenkarte mit Daten zu füllen.
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
              Pseudonym:
            </h2>
            <p></p>
            <article className="UserID" id="UserID">
              ******************
            </article>
            <p className="Space"></p>
          </section>
          <section className="MetaDatenSection">
            <h3 className="MetadatenTitle">Ihre Stammdaten:</h3>
            <article className="Gender" id="currentGender">
              ------
            </article>
            <p></p>
            <article className="Age" id="currentAge">
              ------
            </article>
            <p></p>
            <article className="Height" id="currentHeight">
              ------
            </article>
            <p></p>
            <article className="Weight" id="currentWeight">
              ------
            </article>
            <p></p>
            <article className="ZipCode" id="currentZipCode">
              ------
            </article>
            <p className="Space2"></p>
          </section>
          <section className="TimeStampSection">
            <h4 className="TimestampTitle">Letzte Aktualisierung:</h4>
            <article className="Date" id="lastTimestamp">
              ------
            </article>
          </section>
          <div className="tableDiv">
            <div className="centerDiv">
              <table className="smartDeviceTable">
                <tr className="buttonRow">
                  <td>
                    <button
                      type="button"
                      id="newDataDonation"
                      href="/datenspenden"
                      onClick={goToRegistration}
                    >
                      Stammdaten aktualisieren
                    </button>
                    <div class="toggle-container">
                      <HealthTrackerButton />
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

/**
 * Retrieves and sets the total user count value that is stored on firebase.
 */
export async function SetMetaData(id) {
  userID = id;
  await db
    .doc(id)
    .collection("basedata")
    .orderBy("timestamp", "desc")
    .limit(1)
    .get()
    .then((col) => {
      col.forEach(function (doc) {
        currentGender = doc.data().gender;
        currentAge = doc.data().age;
        currentWeight =
          doc.data().weight == "Keine Angabe"
            ? "Keine Angabe"
            : doc.data().weight + "kg";
        currentHeight =
          doc.data().height == "Keine Angabe"
            ? "Keine Angabe"
            : doc.data().height + "cm";
        currentZipCode = doc.data().zipcode;
        lastTimestamp = doc.data().timestamp;
      });
    })
    .then(() => {
      UpdateMetaDataLabel();
    });
}

/**
 * Updates the 'MetaDataLabels' with a new value.
 */
const UpdateMetaDataLabel = () => {
  try {
    document.getElementById("newDataDonation").disabled = false;

    document.getElementById("UserID").innerHTML = userID;
    document.getElementById("currentGender").innerHTML =
      "Geschlecht: " + currentGender;
    document.getElementById("currentAge").innerHTML = "Alter: " + currentAge;
    document.getElementById("currentWeight").innerHTML =
      "Gewicht: " + currentWeight;
    document.getElementById("currentHeight").innerHTML =
      "Größe: " + currentHeight;
    document.getElementById("currentZipCode").innerHTML =
      "Postleitzahl: " + currentZipCode;
    document.getElementById("lastTimestamp").innerHTML = lastTimestamp;
  } catch (error) {
    console.log("UpdateMetaDataLabel() - not on Profil.");
  }
};

const goToRegistration = () => {
  console.log("TESTESTEST");
  ReactDOM.render(<DataDonation />, document.getElementById("root"));
  CheckRegistered(getCurrentUser().uid).then(() => {
    GatherBaseData();
  });
};

export default Profil;
