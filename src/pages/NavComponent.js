import React from "react";
import Navbar from "../components/menubar/Navbar";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./index";
import LiveMap from "./LiveMap";
import Profil from "./Profil";
import Registration from "./Registration";

const NavComponent = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/home" exact component={Home} />
                <Route path="/heatmap" component={LiveMap} />
                <Route path="/profile" component={Profil} />
                <Route path="/registration" component={Registration} />
            </Switch>
        </Router>
    )
}

export default NavComponent;