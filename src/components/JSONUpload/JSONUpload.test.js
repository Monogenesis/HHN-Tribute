import firebase from "../../Firebase";
import { SetBaseData, currentDate, AddAdvancedData } from "./JSONUpload";

let testBaseData = [];

beforeAll(() => {
  // Set values to whatever you want
  testBaseData.age = 12345;
  testBaseData.gender = "Other";
  testBaseData.height = 35;
  testBaseData.weight = 9999;
  testBaseData.zipcode = 55555;
  testBaseData.timestamp = new Date().toLocaleString("en-ZA");
  SetBaseData(testBaseData, "TESTUSER");
});

test("Values on DB are equal to values set in beforeAll()", async () => {
  let age, gender, height, weight, zipcode;
  const snapshot = await firebase
    .firestore()
    .collection("userdata")
    .doc("TESTUSER")
    .collection("basedata")
    .orderBy("timestamp", "desc")
    .limit(1)
    .get();
  console.log(typeof snapshot != "undefined");
  snapshot.forEach((doc) => {
    age = doc.data().age;
    gender = doc.data().gender;
    height = doc.data().height;
    weight = doc.data().weight;
    zipcode = doc.data().zipcode;

    expect(age).toBe(testBaseData.age);
    expect(gender).toBe(testBaseData.gender);
    expect(height).toBe(testBaseData.height);
    expect(weight).toBe(testBaseData.weight);
    expect(zipcode).toBe(testBaseData.zipcode);
  });
});
test("AddAdvancedData uploads the correct data to firestore", async () => {
  //TestDaten vorbereiten und hochladen mit AddAdvancedData
  let HealthDataArray = [];
  let healthDataObject = {};
  healthDataObject.date = currentDate;
  healthDataObject.time = new Date().toLocaleTimeString("en-GB");
  healthDataObject.heartrate = 80;
  healthDataObject.temperature = 38;
  healthDataObject.bloodpressure = {
    systolic: 80,
    diastolic: 80,
  };
  HealthDataArray.push(JSON.parse(JSON.stringify(healthDataObject)));
  AddAdvancedData(HealthDataArray, "TESTUSER");

  //TestDaten aus Datenbank holen und vergleichen
  let date, time, heartrate, temperature, systolic, diastolic;
  const snapshot = await firebase
    .firestore()
    .collection("userdata")
    .doc("TESTUSER")
    .collection("advanceddata")
    .orderBy("time", "desc")
    .limit(1)
    .get();

  snapshot.forEach((doc) => {
    date = doc.data().date;
    time = doc.data().time;
    heartrate = doc.data().heartrate;
    temperature = doc.data().temperature;
    systolic = doc.data().bloodpressure.systolic;
    diastolic = doc.data().bloodpressure.diastolic;

    //Vergleich (Der eigentliche Test)
    expect(date).toBe(healthDataObject.date);
    expect(time).toBe(healthDataObject.time);
    expect(heartrate).toBe(healthDataObject.heartrate);
    expect(temperature).toBe(healthDataObject.temperature);
    expect(systolic).toBe(healthDataObject.bloodpressure.systolic);
    expect(diastolic).toBe(healthDataObject.bloodpressure.diastolic);
  });
});
