import React, { Component } from "react";
import { NavbarElements } from "./NavbarElements";
import "./Navbar.css";
import TransmissionIndicator from "../TransmissionIndicator/TransmissionIndicator";

class Navbar extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <nav className="NavbarElements">
        <div className="menubar-logo">
          <img src={require("../../images/logo.png")} alt="logo" width="200" />
        </div>
        <TransmissionIndicator />
        <div className="menu-icon" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>

        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {NavbarElements.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
