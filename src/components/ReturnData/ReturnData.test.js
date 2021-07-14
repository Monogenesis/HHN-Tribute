import firebase from "../../Firebase";
import React from "react";
import renderer from "react-test-renderer";
import { SetBaseData } from "../JSONUpload/JSONUpload"
import { baseDataDB  } from "./ReturnData";
import ReturnDataButton from "./ReturnData";

let testBaseData = [];
let docData;

beforeAll(() => {
    testBaseData.age = 958;
    testBaseData.gender = "Male";
    testBaseData.height = 35;
    testBaseData.weight = 9999;
    testBaseData.zipcode = 54312;
    testBaseData.timestamp = new Date().toLocaleString("en-ZA");
    SetBaseData(testBaseData, "TESTUSER");
})

test("Value from DB is the same as set in beforeAll()", async () => {
    docData = baseDataDB("TESTUSER").then(() => {
        expect(docData).toEqual(testBaseData);
    })
})
test("ReturnDataButton renders correctly", () => {
    const tree = renderer.create(<ReturnDataButton></ReturnDataButton>).toJSON();
expect(tree).toMatchSnapshot();
})