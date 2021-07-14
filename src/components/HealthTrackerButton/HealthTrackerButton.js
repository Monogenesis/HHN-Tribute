import React, { useState, useEffect } from "react";
import "./HealthTrackerButton.css";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";

export const getIsDeviceConnected = () => {
  return localStorage.getItem("isDeviceConnected") !== null
    ? localStorage.getItem("isDeviceConnected")
    : "false";
};

const toggleConnection = () => {
  document.getElementById("transmissionIndicator").style.color =
    getIsDeviceConnected() == "false" ? "#808080" : "#152028";
  let isDeviceConnected = getIsDeviceConnected();
  console.log(typeof getIsDeviceConnected());
  if (localStorage.getItem("isDeviceConnected") === null) {
    localStorage.setItem("isDeviceConnected", "true");
    isDeviceConnected = true;
  } else {
    isDeviceConnected = getIsDeviceConnected() === "true" ? "false" : "true";
    localStorage.setItem("isDeviceConnected", isDeviceConnected);
  }
  console.log(
    "Healthtracker is now " +
      (isDeviceConnected === "true" ? "connected!" : "disconnected!")
  );
};

const HealthTrackerButton = () => {
  const [value, setValue] = useState(false);
  const borderRadiusStyle = { borderRadius: 2 };
  useEffect(() => {
    document.getElementById("transmissionIndicator").style.color =
      getIsDeviceConnected() == "false" ? "#152028" : "#808080";
    setValue(getIsDeviceConnected() == "true");
  }, []);

  return (
    <div id="trackerDiv" class="toggle-switch">
      <label> Gesundheitstracker:</label>
      <IOSSwitch
        checked={value}
        onChange={() => {
          toggleConnection();
          setValue(!value);
        }}
      ></IOSSwitch>
    </div>
  );
};

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 60,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(36px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    borderRadius: 1,
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 1,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: "#ff0000",
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default HealthTrackerButton;
