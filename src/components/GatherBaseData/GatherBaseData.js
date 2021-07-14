import React from "react";
import ReactDOM from "react-dom";
import Home from "../../pages/index";
import NavComponent from "../../pages/NavComponent";
import Registration from "../../pages/Registration";
import { SetBaseData } from "../JSONUpload/JSONUpload";
import { getCurrentUser } from "../UserAuthentication/UserAuthentication";
import {
  CheckRegistered,
  IsRegistered,
} from "../RegistrationCheck/RegistrationCheck";
import { baseDataDB } from "../ReturnData/ReturnData";
import places from "../HeatMap/Zipcodes_de.js";

const firebase = require("firebase");
require("firebase/firestore");
const db = firebase.firestore().collection("userdata");

let unchanged = true;
let gender;
let height;
let age;
let weight;
let unspecifiedString = "Bitte auswählen.";
let noDataProvidedString = "Keine Angabe";
let zipcode = unspecifiedString;

/**
 * Calls all gather-methods to display on the frontend.
 */
export const GatherBaseData = () => {
  try {
    GatherGender();
    GatherHeight();
    GatherAge();
    GatherWeight();
    GatherZipCode();
    CheckRegistered(getCurrentUser().uid).then(() => {
      if (IsRegistered === true) {
        GetDocData(getCurrentUser().uid);
      }
    });
  } catch (error) {
    console.log("not on registration");
  }
};

/**
 * Creates a dropdown menu to select gender options.
 * The selected value is assigned to 'gender' immediately.
 */
export function GatherGender() {
  let list = document.getElementById("gender");
  let genderArray = ["divers", "weiblich", "männlich"];
  let unspecified = document.createElement("option");
  unspecified.innerHTML = unspecifiedString;
  unspecified.value = unspecified.innerHTML;
  list.appendChild(unspecified);
  let noInfo = document.createElement("option");
  noInfo.innerHTML = noDataProvidedString;
  noInfo.value = noInfo.innerHTML;
  list.appendChild(noInfo);

  for (let i = 0; i < genderArray.length; i++) {
    let option = document.createElement("option");
    option.innerHTML = genderArray[i];
    option.value = genderArray[i];
    console.log(i);
    list.appendChild(option);
  }
  list.onchange = () => {
    gender = list.value;
    unchanged = false;
  };
  gender = list.options[0].value;
}

/**
 * Creates a dropdown menu to select possible heights.
 * The selected value is assigned to 'height' immediately.
 */
const GatherHeight = () => {
  let list = document.getElementById("height");
  let unspecified = document.createElement("option");
  unspecified.innerHTML = unspecifiedString;
  unspecified.value = unspecified.innerHTML;
  list.appendChild(unspecified);
  let noInfo = document.createElement("option");
  noInfo.innerHTML = noDataProvidedString;
  noInfo.value = noInfo.innerHTML;
  list.appendChild(noInfo);

  for (let i = 50; i <= 235; i += 5) {
    let option = document.createElement("option");
    option.setAttribute("value", i);
    option.text = i + "cm";
    list.appendChild(option);
  }
  list.onchange = () => {
    height = list.value;
    unchanged = false;
  };
  height = list.options[0].value;
};

/**
 * Creates a dropdown menu to select possible ages.
 * The selected value is assigned to 'age' immediately.
 */
const GatherAge = () => {
  let list = document.getElementById("age");
  let unspecified = document.createElement("option");
  unspecified.innerHTML = unspecifiedString;
  unspecified.value = unspecified.innerHTML;
  list.appendChild(unspecified);
  let noInfo = document.createElement("option");
  noInfo.innerHTML = noDataProvidedString;
  noInfo.value = noInfo.innerHTML;
  list.appendChild(noInfo);

  for (let i = 5; i <= 125; i += 5) {
    let option = document.createElement("option");
    option.setAttribute("value", i);
    option.text = i;
    list.appendChild(option);
  }
  list.onchange = () => {
    age = list.value;
    unchanged = false;
  };
  age = list.options[0].value;
};

/**
 * Creates a dropdown menu to select possible weights.
 * The selected value is assigned to 'weight' immediately.
 */
const GatherWeight = () => {
  let list = document.getElementById("weight");
  let unspecified = document.createElement("option");
  unspecified.innerHTML = unspecifiedString;
  unspecified.value = unspecified.innerHTML;
  list.appendChild(unspecified);
  let noInfo = document.createElement("option");
  noInfo.innerHTML = noDataProvidedString;
  noInfo.value = noInfo.innerHTML;
  list.appendChild(noInfo);

  for (let i = 35; i <= 350; i += 5) {
    let option = document.createElement("option");
    option.setAttribute("value", i);
    option.text = i + "kg";
    list.appendChild(option);
  }
  list.onchange = () => {
    weight = list.value;
    unchanged = false;
  };
  weight = list.options[0].value;
};

/**
 * Creates an input field to enter a zip code.
 */
export const GatherZipCode = () => {
  let input = document.getElementById("zipCode");
  input.placeholder = "Bitte geben Sie Ihre Postleitzahl an.";
  input.onchange = () => {
    zipcode = input.value;
    unchanged = false;
  };
};

/**
 * Packages all of the basedata into a JSON object.
 */
const BaseDataJson = () => {
  let baseData = [];
  baseData.gender = gender;
  baseData.height = height;
  baseData.age = age;
  baseData.weight = weight;
  baseData.zipcode = zipcode;
  baseData.timestamp = new Date().toLocaleString("en-ZA");

  return baseData;
};

/**
 * Gets the most recent base data entry from the database, then updates the React component.
 * @param {*} pseudonym The pseudonym of the current user
 */
async function GetDocData(pseudonym) {
  let newBaseValue = {};
  await db
    .doc(pseudonym)
    .collection("basedata")
    .orderBy("timestamp", "desc")
    .limit(1)
    .get()
    .then((col) => {
      col.forEach(function (doc) {
        newBaseValue.gender = doc.data().gender;
        newBaseValue.age = doc.data().age;
        newBaseValue.weight = doc.data().weight;
        newBaseValue.height = doc.data().height;
        newBaseValue.zipcode = doc.data().zipcode;
      });
    })
    .then(() => {
      UpdateBaseDataReact(newBaseValue);
    });
}

/**
 * Updates the react select lists and assigns correct values to all let's.
 * @param {*} data The data array from the database
 */
function UpdateBaseDataReact(data) {
  // GENDER
  switch (data.gender) {
    case "divers":
      document.getElementById("gender").selectedIndex = 2;
      break;
    case "weiblich":
      document.getElementById("gender").selectedIndex = 3;
      break;
    case "männlich":
      document.getElementById("gender").selectedIndex = 4;
      break;
    case noDataProvidedString:
      document.getElementById("gender").selectedIndex = 1;
      break;
    default:
      document.getElementById("gender").selectedIndex = 0;
  }
  gender = data.gender;
  // AGE
  if (isNaN(data.age)) {
    document.getElementById("age").selectedIndex = 1;
    age = noDataProvidedString;
  } else {
    document.getElementById("age").selectedIndex = data.age / 5 + 1;
    age = data.age;
  }

  // WEIGHT
  if (isNaN(data.weight)) {
    document.getElementById("weight").selectedIndex = 1;
    weight = noDataProvidedString;
  } else {
    document.getElementById("weight").selectedIndex = data.weight / 5 - 5;
    weight = data.weight;
  }
  // HEIGHT
  if (isNaN(data.height)) {
    document.getElementById("height").selectedIndex = 1;
    height = noDataProvidedString;
  } else {
    document.getElementById("height").selectedIndex = data.height / 5 - 8;
    height = data.height;
  }
  height = data.height;
  // ZIPCODE
  document.getElementById("zipCode").value = data.zipcode;
  zipcode = data.zipcode;
}

/**
 * Submits base data to firestore after checking if the zip code is valid.
 */
export const SubmitData = () => {
  console.log(
    `Gender: ${gender} \nHeight: ${height}\nAge: ${age}\nWeight: ${weight}\nZip Code: ${zipcode}`
  );
  if (checkDataInput().valueOf(true)) {
    alert("Bitte geben Sie alle Stammdaten an.");
    return;
  }
  if (typeof zipcode === "undefined") {
    alert("Bitte geben Sie eine Postleitzahl an");
  } else if (zipcode.length > 5) {
    alert("Die Postleitzahl ist zu lang.");
  } else if (isNaN(zipcode)) {
    alert("Bitte geben Sie nur Zahlen an.");
  } else if (zipcode.length < 5) {
    alert("Die Postleitzahl ist zu kurz.");
  } else {
    var zipFound = false;
    Object.keys(places).some((key) => {
      if (places[key].zipcode == zipcode) {
        zipFound = true;
      }
      return zipFound;
    });
    if (zipFound) {
      if (unchanged === false) {
        SetBaseData(BaseDataJson(), getCurrentUser().uid);
        CheckRegistered(getCurrentUser().uid).then(() => {
          document.location.href = "/profil";
          ReactDOM.render(<NavComponent />, document.getElementById("root"));
        });
        alert("Die Daten wurden erfolgreich übertragen.");
      } else {
        alert("Die Angaben haben sich nicht verändert.");
      }
    } else {
      alert("Diese Postleitzahl gibt es nicht in Deutschland.");
    }
  }
};

const checkDataInput = () => {
  let bool;
  gender === unspecifiedString ||
  age === unspecifiedString ||
  height === unspecifiedString ||
  weight === unspecifiedString
    ? (bool = true)
    : (bool = false);

  return bool;
};

export const functions = {
  GatherBaseData: () => GatherBaseData(),
  GatherGender: () => GatherGender(),
  GatherAge: () => GatherAge(),
  GatherHeight: () => GatherHeight(),
  GatherWeight: () => GatherWeight(),
  GatherZipCode: () => GatherZipCode(),
};

export const SubmitDataButton = () => {
  return (
    <div>
      <button
        type="button"
        id="submitDataButton"
        onClick={() => {
          SubmitData();
        }}
      >
        Daten spenden
      </button>
    </div>
  );
};

export default GatherBaseData;
