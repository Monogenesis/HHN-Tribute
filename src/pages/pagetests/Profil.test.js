import React from "react";
import renderer from "react-test-renderer";
import Profil from "../Profil.js"

test("Profile Page renders correctly", () => {
    const tree = renderer.create(<Profil></Profil>).toJSON();
expect(tree).toMatchSnapshot();
})