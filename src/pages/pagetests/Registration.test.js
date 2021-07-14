import firebase from "../../Firebase.js" //Wird benötigt 
import React from "react";
import renderer from "react-test-renderer";
import Registration from "../Registration";

test("Registration Page renders correctly", () => {
    const tree = renderer.create(<Registration></Registration>).toJSON();
expect(tree).toMatchSnapshot();
})