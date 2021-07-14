import firebase from "../Firebase";
import {
  SetTotalUserCount,
  UpdateUserCounter,
} from "./UserCounter/UserCounter";
import { db } from "./JSONUpload/JSONUpload";
import {
  IsRegistered,
  CheckRegistered,
  RedirectToRegistration,
} from "./RegistrationCheck/RegistrationCheck";
import GatherBaseData from "./GatherBaseData/GatherBaseData";
import { SetMetaData } from "../pages/Profil.js";
var userSignedIn = false;
var currentUser;

/**
 * This function logs the user in when the service is used for the first time, otherwise the user is logged in
 */
export const signInUser = () => {
  userSignedIn = true;
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  firebase
    .auth()
    .signInAnonymously()
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
};

/**
 * @returns the current user
 */
export const getCurrentUser = () => {
  return currentUser;
};

/**
 * This function checks in the authentication server if the current user is logged in and returns the user as object.
 * This also checks if a document under the user pseudonym was already created, and if not, then
 * it creates one and updates the UserCounter.
 */
(async function () {
  CheckAuthentication();
})();

async function CheckAuthentication() {
  await firebase.auth().onAuthStateChanged(function (user) {
    console.log(user);
    if (user) {
      // User is signed in.
      let uid = user.uid;
      currentUser = user;
      console.log(uid);
      db.doc(uid)
        .get()
        .then((doc) => {
          if (!doc.exists) {
            db.doc(uid)
              .set({})
              .then(() => {
                UpdateUserCounter();
              });
          }
        });

      GatherBaseData();
      SetTotalUserCount();
      SetMetaData(uid);
      CheckRegistered().then(() => {
        if (
          IsRegistered === false &&
          !document.location.href.includes("registration")
        ) {
          RedirectToRegistration();
        }
      });
    }
  });
}
