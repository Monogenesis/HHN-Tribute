import React from 'react';
import Navbar from '../components/menubar/Navbar';
import firebase from "../Firebase";
import NavComponent from "./NavComponent"

const Loading = () => {

    return (
        <header>
            <section>
                <div>
                    <img src={require('../images/Logo_2.png')} alt='logo' />
                </div>
            </section>
            <section>
                <div>
                    <img src={require('../images/Loading_Circle.gif')} alt='logo' />
                </div>
            </section>
            <h1>Loading...</h1>
        </header>
    )
}

export default Loading;