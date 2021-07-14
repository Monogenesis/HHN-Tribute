import React from "react";
import renderer from "react-test-renderer";
import Livemap from "../LiveMap.js";

test("LiveMap Page renders correctly", () => {
  const tree = renderer.create(<Livemap></Livemap>).toJSON();
  expect(tree).toMatchSnapshot();
});
