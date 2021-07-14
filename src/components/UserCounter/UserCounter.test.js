import firebase from "../../Firebase";
import { SetTotalUserCount, TotalUsers, UpdateUserCounter } from "./UserCounter";

test("TotalUsers is defined and a number", async () => {
    await SetTotalUserCount().then(() => {
        expect(TotalUsers).toBeTruthy();
        expect(TotalUsers).toBeGreaterThanOrEqual(0);
    })
})

test("UserCounter increments correctly", async () => {
    await SetTotalUserCount().then(() => {
        let baseUserCount;
        UpdateUserCounter().then(() => {
            expect(TotalUsers).toBe(baseUserCount + 1);
        })
    })
})