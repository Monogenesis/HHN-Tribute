const firebase = require("firebase");
require("firebase/firestore");

const db = firebase.firestore().collection("totalusers");

export var TotalUsers;

/**
 * Retrieves and sets the total user count value that is stored on firebase.
 */
export async function SetTotalUserCount() {
  await db
    .doc("users")
    .get()
    .then((doc) => {
      return (TotalUsers = parseInt(doc.data().count));
    });

  console.log("TOTAL USERS: " + TotalUsers);
  UpdateUserCounterLabel(TotalUsers);
}

/**
 * This calls SetTotalUserCount() and updates the DB with the returned promise + 1.
 * Calls SetTotalUserCount() again to get the most recent value.
 */
export async function UpdateUserCounter() {
  SetTotalUserCount().then(() => {
    TotalUsers++;
    db.doc("users").set({
      count: TotalUsers,
    });
    SetTotalUserCount();
  });
}

/**
 * Updates the 'UserCounterLabel' with a new value.
 */
const UpdateUserCounterLabel = () => {
  try {
    document.getElementById("UserCounterLabel").textContent = TotalUsers;
  } catch (error) {
    console.log("UpdateUserCounterLabel() - not on Homepage.");
  }
};
