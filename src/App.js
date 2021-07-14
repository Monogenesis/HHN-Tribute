import React from "react";
import "./App.css";
import firebase from "./Firebase";
import Navbar from "./components/menubar/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages";
import LiveMap from "./pages/LiveMap";
import Profil from "./pages/Profil";
import Registration from "./pages/Registration";
import { signInUser } from "./components/UserAuthentication/UserAuthentication";


function App() {
  signInUser();
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/heldenkarte" component={LiveMap} />
        <Route path="/profil" component={Profil} />
        <Route path="/registrierung" component={Registration} />
      </Switch>
    </Router>
  );
}

export default App;
