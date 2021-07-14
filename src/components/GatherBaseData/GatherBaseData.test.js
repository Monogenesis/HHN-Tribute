// !!DO NOT DELETE!! This import is needed for the tests to run!
import firebase from "../../Firebase";

const { functions } = require("./GatherBaseData");


test("All gather methods return a value", () => {
    expect(functions.GatherBaseData).toBeTruthy();
    expect(functions.GatherAge).toBeTruthy();
    expect(functions.GatherHeight).toBeTruthy();
    expect(functions.GatherWeight).toBeTruthy();
    expect(functions.GatherZipCode).toBeTruthy();
})