import React from "react";
import renderer from "react-test-renderer";
import Navbar from "./Navbar.js"

test("Navbar renders correctly", () => {
    const tree = renderer.create(<Navbar></Navbar>).toJSON();
expect(tree).toMatchSnapshot();
})