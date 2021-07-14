import firebase from "../../Firebase";
import { userSignedIn, signInUser } from "./UserAuthentication";

test("signInUser works properly", () => {
    signInUser().then(() => {
        expect(userSignedIn).toBe(true);
    })
})