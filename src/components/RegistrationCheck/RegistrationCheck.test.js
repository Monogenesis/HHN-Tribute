import firebase from "../../Firebase";
import { CheckRegistered, IsRegistered } from "./RegistrationCheck";


test("TESTUSER has entries in the basedata collection, setting IsRegistered to true",
    () => {
        CheckRegistered("TESTUSER").then(() => {
            expect(IsRegistered).toEqual(true);
        })
    });
