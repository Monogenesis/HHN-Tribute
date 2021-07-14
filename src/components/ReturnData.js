import React from "react";
import App from "../App";
import { getCurrentUser } from "./UserAuthentication";
import { currentDate } from "./JSONUpload/JSONUpload";
import "./ReturnData.css";

const firebase = require("firebase");
require("firebase/firestore");

export function baseDataDB(pseudonym) {
  const db = firebase.firestore();
  db.collection("userdata")
    .doc(pseudonym)
    .collection("basedata")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        console.log(doc.data());
      });
    });
}

export function simuDataDB(pseudonym) {
  const db = firebase.firestore();
  db.collection("userdata")
    .doc(pseudonym)
    .collection("advanceddata")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        console.log(doc.data());
      });
    });
}

const ReturnDataButton = () => {
  return (
    <div>
      <button type="button"id="returnDataButton"
        onClick={() => {
          baseDataDB(getCurrentUser().uid);
          simuDataDB(getCurrentUser().uid);
        }}
      >
        Check my stats
      </button>
    </div>
  );
};

export default ReturnDataButton;
