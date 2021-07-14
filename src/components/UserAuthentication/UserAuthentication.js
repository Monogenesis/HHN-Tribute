import firebase from "../../Firebase";
import {
  SetTotalUserCount,
  UpdateUserCounter,
} from "../UserCounter/UserCounter";
import { db } from "../JSONUpload/JSONUpload";
import { SetMetaData, setUserID } from "../../pages/Profil";
import {
  IsRegistered,
  CheckRegistered,
  RedirectToRegistration,
  NavbarToggle,
} from "../RegistrationCheck/RegistrationCheck";
import GatherBaseData, { GatherGender } from "../GatherBaseData/GatherBaseData";
import Navbar from "../menubar/Navbar";

export var userSignedIn = false;
var currentUser;

/**
 * This function logs the user in when the service is used for the first time, otherwise the user is logged in
 */
export const signInUser = async () => {
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
  CheckAuthentication().then(() => {});
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
      SetMetaData(uid);
      NavbarToggle();
      SetTotalUserCount();
      CheckRegistered(getCurrentUser().uid).then(() => {
        if (
          IsRegistered === false &&
          !document.location.href.includes("registrierung")
        ) {
          RedirectToRegistration();
        } else {
          document.getElementsByClassName(
            "NavbarElements"
          )[0].style.visibility = "visible";
        }
      });
    }
  });
}
