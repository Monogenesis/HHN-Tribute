import React from "react";
import "./pagestyles/LiveMap.css";
import { GatherGender } from "../components/GatherBaseData/GatherBaseData";
import { SubmitData } from "../components/GatherBaseData/GatherBaseData";
import "./pagestyles/Registration.css";
import { IconButton, Tooltip } from "@material-ui/core";
import { FcInfo } from "react-icons/fc";
const Registration = (props) => {
  return (
    <main>
      <section id="Header">
        <h1 className="RegistrationTitle">Registrierung</h1>
        <h2 className="RegistrationHeader">
          Bitte spenden Sie hier Ihre Daten
          <Tooltip
            title={
              <span>
                <h3>Hier geben Sie ihre Stammdaten an.</h3>
                <br />
                <h3>
                  Alter, Größe und Gewicht werden nur in fünfer Schritten
                  angegben, um ihre Angaben weiter zu anonymisieren.
                </h3>
                <br />
                <h3>
                  Bitte geben Sie mindestens ihre Postleitzahl an damit wir Ihre
                  Daten nutzen können.
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
        </h2>
        <p className="Space"></p>
      </section>

      <section className="tibutField">
        <table className="tributTable">
          <tbody>
            <tr>
              <td className="genderLabel">Geschlecht:</td>
              <td className="genderArea">
                <select className="dropdownGender" id="gender">
                  {props.GatherGender}
                </select>
              </td>
            </tr>
            <tr>
              <td className="ageLabel">Alter:</td>
              <td className="ageArea">
                <select className="dropdownAge" id="age"></select>
              </td>
            </tr>
            <tr>
              <td className="heightLabel">Größe:</td>
              <td className="heightArea">
                <select className="dropdownHeight" id="height"></select>
              </td>
            </tr>
            <tr>
              <td className="weightLabel">Gewicht:</td>
              <td className="weightArea">
                <select className="dropdownWeight" id="weight"></select>
              </td>
            </tr>
            <tr>
              <td className="zipCodeLabel">Postleitzahl:</td>
              <td className="zipCodeArea">
                <input className="fieldZipCode" id="zipCode"></input>
              </td>
            </tr>
            <tr>
              <td className="spaceHolder"></td>
              <td className="submitButtonField">
                {" "}
                <button type="button" id="submitButton" onClick={SubmitData}>
                  Daten spenden
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Registration;
