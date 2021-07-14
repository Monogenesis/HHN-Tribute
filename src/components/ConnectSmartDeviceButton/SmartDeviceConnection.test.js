import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import App from "../../App";
import SmartDeviceConnection from "./SmartDeviceConnection";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SmartDeviceConnection></SmartDeviceConnection>, div);
});

test("advanceddata gets generated", () => {});

test("renders correctly", () => {
  const tree = renderer
    .create(<SmartDeviceConnection type="Warning"></SmartDeviceConnection>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
