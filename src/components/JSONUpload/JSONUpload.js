const firebase = require("firebase");
require("firebase/firestore");

export const db = firebase.firestore().collection("userdata");
export let currentDate = new Date().toISOString().slice(0, 10);

/**
 * Uploads base data under the users' pseudonym to firestore.
 * The base data consists of: Gender, Height*, Age*, Weight*, Zip Code
 * *in steps of five
 * @param {*} JsonObject The JSON Object that contains the base data
 * @param {*} pseudonym  The pseudonym of the user
 */
export function SetBaseData(JsonObject, pseudonym) {
  db.doc(pseudonym).collection("basedata").add({
    gender: JsonObject.gender,
    height: JsonObject.height,
    age: JsonObject.age,
    weight: JsonObject.weight,
    zipcode: JsonObject.zipcode,
    timestamp: JsonObject.timestamp,
  });
}

/**
 * Uploads advanced data under the users' pseudonym to firestore.
 * Advanced data consists of: current date, current time, heartrate, body temperature, bloodpressure
 * @param {*} JsonArray The array filled with JSON objects
 * @param {*} pseudonym The pseudonym of the user
 */
export function AddAdvancedData(JsonArray, pseudonym) {
  JsonArray.forEach(function (object) {
    db.doc(pseudonym).collection("advanceddata").add({
      date: object.date,
      time: object.time,
      heartrate: object.heartrate,
      temperature: object.temperature,
      bloodpressure: object.bloodpressure,
    });
  });
}
