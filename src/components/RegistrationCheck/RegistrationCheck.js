import firebase from "../../Firebase";
import React from "react";
import ReactDOM from "react-dom";
import { db } from "../JSONUpload/JSONUpload";
import { getCurrentUser } from "../UserAuthentication//UserAuthentication";
import { Redirect, Route } from "react-router-dom";
import Registration from "../../pages/Registration";
import Navbar from "../menubar/Navbar";
import GatherBaseData from "../GatherBaseData/GatherBaseData.js";

export var IsRegistered;

/**
 * Checks if the user already provided basedata and sets IsRegistered accordingly.
 */
export async function CheckRegistered(pseudonym) {
  await db
    .doc(pseudonym)
    .collection("basedata")
    .get()
    .then((col) => {
      col.docs.indexOf(0);
      if (col.size >= 1) {
        IsRegistered = true;
      } else {
        IsRegistered = false;
      }
    });
}

export function NavbarToggle(bool) {
  if (bool === false) {
    document.getElementsByClassName("NavbarElements")[0].style.visibility =
      "hidden";
  } else {
    document.getElementsByClassName("NavbarElements")[0].style.visibility =
      "visible";
  }
}

/**
 * Redirects the user to the registration page.
 */
export function RedirectToRegistration() {
  document.getElementsByClassName("NavbarElements")[0].style.visibility =
    "hidden";
  ReactDOM.render(<Registration />, document.getElementById("root"));
  GatherBaseData();
}
