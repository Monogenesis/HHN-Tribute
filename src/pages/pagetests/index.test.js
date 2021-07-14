import React from "react";
import renderer from "react-test-renderer";
import Home from "../index.js"

test("Index / Home page renders correctly", () => {
    const tree = renderer.create(<Home></Home>).toJSON();
expect(tree).toMatchSnapshot();
})