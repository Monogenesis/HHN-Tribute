// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Cloud Firestore.
/* const admin = require("firebase-admin"); */
const dateToday = new Date().toISOString().slice(0, 10);
const firebase = require("firebase");
const { user } = require("firebase-functions/lib/providers/auth");
require("firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyA7JLC43MJ1tidOX5WEq_9gGEbprdQdxeM",
  authDomain: "tribute-db.firebaseapp.com",
  databaseURL: "https://tribute-db.firebaseio.com",
  projectId: "tribute-db",
  storageBucket: "tribute-db.appspot.com",
  messagingSenderId: "810349477326",
  appId: "1:810349477326:web:e40309e54212b4fcfdbf9f",
  measurementId: "G-FX07892020",
};
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

//Grabs all the Data from the given pseudonym id
exports.getData = functions
  .region("europe-west1")
  .https.onRequest(async (req, res) => {
    // Grab the text parameter.
    //const currentUser = firebase.auth().currentUser;

    //Base queries
    const pseudonym = req.query.id; //String

    // data defining queries
    const baseData = req.query.basedata; // true or false

    const timeFrom = req.query.timefrom; // HH:MM:SS format
    const timeTo = req.query.timeto; // HH:MM:SS format
    const dateFrom = req.query.fromdate; // YYYY-MM-DD format
    const dateTo = req.query.todate; // YYYY-MM-DD format
    const order = req.query.order; // desc asc
    const bloodpressure = req.query.bpressure; // true or false
    const heartrate = req.query.hrate; // true or false
    const bodyTemperature = req.query.temp; // true or false
    //const timestamp = req.query.timestamp; // true or false
    const zipcode = req.query.zipcode; // String format
    const orderby = req.query.orderby; // date, heartrate, temperature

    let timeFromDefined = typeof timeFrom != "undefined";
    let timeToDefined = typeof timeTo != "undefined";
    let dateFromDefined = typeof dateFrom != "undefined";
    let dateToDefined = typeof dateTo != "undefined";
    let orderDefined = typeof order != "undefined";
    let orderbyDefined = typeof orderby != "undefined";
    let zipcodeDefined = typeof zipcode != "undefined";
    console.log("timeFrom: " + timeFromDefined);
    console.log("timeTo: " + timeToDefined);
    console.log("dateFrom: " + dateFromDefined);
    console.log("dateTo: " + dateToDefined);
    console.log("order: " + orderDefined);
    console.log("zipcode: " + zipcodeDefined);

    // Only return single user data
    console.log("Pseudonym ID: " + pseudonym);
    if (typeof pseudonym != "undefined") {
      const userDocRef = db.collection("userdata").doc(pseudonym);
      const userDoc = await userDocRef.get();
      var jsonResult = {};
      var basedata = [];
      var advanceddata = [];
      //Check is doc with pseudonym exists
      console.log("User document exists: " + userDoc.exists);
      if (!userDoc.exists) {
        return res.json(
          "There is no document behind the pseudonym: " + pseudonym
        );
      } else {
        // check if basedata is not empty
        const baseDataCollRef = userDocRef.collection("basedata");
        let baseBataExists;
        await baseDataCollRef.get().then((coll) => {
          baseBataExists = coll.docs.length > 0;
        });
        console.log(baseBataExists ? "Basedata exists" : "No basedata exists");
        if (!baseBataExists) {
          return res.json(
            "There is no basedata behind the pseudonym: " + pseudonym
          );
        } else {
          const snapshot = await baseDataCollRef
            .orderBy("timestamp", orderDefined ? order : "desc")
            .limit(1)
            .get();
          snapshot.forEach((doc) => {
            basedata.push(doc.data());
          });
        }

        //check if "test2" collection has data
        const advanceddataCollRef = userDocRef.collection("advanceddata");
        let advanceddataExists;
        await advanceddataCollRef.get().then((coll) => {
          advanceddataExists = coll.docs.length > 0;
        });
        console.log(
          advanceddataExists ? "Advanceddata exists" : "No advanced data exists"
        );
        if (!advanceddataExists) {
          return res.json(
            " There is no personal data behind the pseudonym: " + pseudonym
          );
        } else {
          console.log("Order by: " + orderby);

          if ((orderbyDefined && orderby == "date") || !orderbyDefined) {
            const selectionDate = await advanceddataCollRef
              .where("date", ">=", dateFromDefined ? dateFrom : "1970-01-01")
              .where("date", "<=", dateToDefined ? dateTo : dateToday)
              .orderBy("date", orderDefined ? order : "desc")
              .get()
              .then((snapshot) => {
                snapshot.forEach((doc) => {
                  let timeData = new Date(
                    "1970-01-01 " + doc.data().time.toString()
                  );
                  const timeRangeCheck =
                    timeData >=
                      (timeFromDefined
                        ? new Date("1970-01-01 " + timeFrom.toString())
                        : new Date("1970-01-01 00:00:00")) &&
                    timeData <=
                      (timeToDefined
                        ? new Date("1970-01-01 " + timeTo.toString())
                        : new Date("1970-01-01 23:59:59"));

                  if (timeRangeCheck) {
                    advanceddata.push(doc.data());
                  }
                });
              });
          } else {
            const selectionDate = await advanceddataCollRef
              .where("date", ">=", dateFromDefined ? dateFrom : "1970-01-01")
              .where("date", "<=", dateToDefined ? dateTo : dateToday)
              .orderBy("date", orderDefined ? order : "desc")
              .orderBy(orderby.toString(), orderDefined ? order : "desc")
              .get()
              .then((snapshot) => {
                snapshot.forEach((doc) => {
                  if (
                    (doc.data().time >= timeFromDefined
                      ? timeFrom
                      : "00:00:00") &&
                    (doc.data().time <= timeToDefined ? timeTo : "23:59:59")
                  ) {
                    //console.log(doc.data());
                    advanceddata.push(doc.data());
                  }
                });
              });
          }
        }

        //console.log(advanceddata);
        jsonResult.basedata = basedata;
        jsonResult.advanceddata = advanceddata;
        return res.json(jsonResult);
      }
    } else {
      var dataCount = 0;
      const jsonResult = {};
      const allData = [];
      const userDataSnapshot = await db.collection("userdata").get();
      userLoop: for (const doc of userDataSnapshot.docs) {
        const userObject = [];
        const advanceddata = [];
        userObject.push(doc.id);
        //const snapshot = await doc.ref.collection("advanceddata").get();
        var snapshot;
        if ((orderbyDefined && orderby == "date") || !orderbyDefined) {
          snapshot = await db
            .collection("userdata")
            .doc(doc.id)
            .collection("advanceddata")
            .where("date", ">=", dateFromDefined ? dateFrom : "1970-01-01")
            .where("date", "<=", dateToDefined ? dateTo : dateToday)
            .orderBy("date", orderDefined ? order : "desc")
            .get();
        } else {
          snapshot = await db
            .collection("userdata")
            .doc(doc.id)
            .collection("advanceddata")
            .where("date", ">=", dateFromDefined ? dateFrom : "1970-01-01")
            .where("date", "<=", dateToDefined ? dateTo : dateToday)
            .orderBy("date", orderDefined ? order : "desc")
            .orderBy(orderby.toString(), orderDefined ? order : "desc")
            .get();
        }

        const userBasedataSnapshot = await doc.ref
          .collection("basedata")
          .orderBy("timestamp", "desc")
          .limit(1)
          .get();

        if (userBasedataSnapshot.size === 0) {
          continue;
        }
        let isValid = true;
        if (!userBasedataSnapshot.empty) {
          userBasedataSnapshot.docs.forEach((doc) => {
            if (zipcodeDefined && doc.data().zipcode != zipcode) {
              isValid = false;
            } else {
              let basedataStruct = {};
              basedataStruct.gender = doc.data().gender;
              basedataStruct.age = doc.data().age;
              basedataStruct.height = doc.data().height;
              basedataStruct.weight = doc.data().weight;
              basedataStruct.zipcode = doc.data().zipcode;
              basedataStruct.timestamp = doc.data().timestamp;
              userObject.push(basedataStruct);
            }
          });
        }
        if (!isValid) {
          continue;
        }
        snapshot.docs.map(async (doc) => {
          //Filter
          let date = doc.data().date;
          let temp = doc.data().temperature;
          let heartrate = doc.data().heartrate;
          let time = doc.data().time;
          // date >= (dateFromDefined ? dateFrom : "1970-01-01") &&
          // date <= (dateToDefined ? dateTo : dateToday) &&
          if (
            time >= (timeFromDefined ? timeFrom : "00:00:00") &&
            time <= (timeToDefined ? timeTo : "23:59:59")
          ) {
            let dataStruct = {};
            dataStruct.bloodpressure = doc.data().bloodpressure;
            dataStruct.date = doc.data().date;
            dataStruct.heartrate = doc.data().heartrate;
            dataStruct.temperature = doc.data().temperature;
            dataStruct.time = doc.data().time;
            advanceddata.push(dataStruct);
            dataCount++;
          }
        });

        userObject.push(advanceddata);
        if (userObject[2].length > 0) {
          allData.push(userObject);
        }
      }
      jsonResult.userData = allData;
      console.log("Advanceddata count: " + dataCount);
      return res.json(jsonResult);
    }
  });
