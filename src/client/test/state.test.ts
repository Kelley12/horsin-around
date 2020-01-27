import { assert } from "chai";
import { state, checkForSession } from "../helpers";
import { emptyUser, User, Show, ShowClass, Rider } from "../../shared";
const localStorage = require("localStorage");

const testToken = "12345";
const testUser: User = { userId: 0, name: "test", email: "test@test.com", role: "user" };
const testShow: Show = {
    showId: 0, name: "TestShow", showDate: new Date(2020, 1, 1), distance: 100 };
const testShowClass: ShowClass = { showClassId: 0, name: "TestClass", speed: 100 };
const testRider: Rider = { riderId: 0, firstName: "Test", lastName: "Rider" };

describe("State", () => {
    describe("Get", () => {
        it("Should return an empty user", () => {
            const user = state.get().user;
            assert.typeOf(user, "object");
            assert.deepStrictEqual(user.name, "");
            assert.deepStrictEqual(user.email, "");
            assert.deepStrictEqual(user.role, "user");
        });

        it("Should get an empty list of Shows", () => {
            const shows = state.get().shows;
            assert.typeOf(shows, "Array");
            assert.deepStrictEqual(shows.length, 0);
        });

        it("Should get an empty list of ShowClasses", () => {
            const classes = state.get().showClasses;
            assert.typeOf(classes, "Array");
            assert.deepStrictEqual(classes.length, 0);
        });

        it("Should get an empty list of Riders", () => {
            const rider = state.get().riders;
            assert.typeOf(rider, "Array");
            assert.deepStrictEqual(rider.length, 0);
        });

        it("Should get an empty list of Users", () => {
            const user = state.get().users;
            assert.typeOf(user, "Array");
            assert.deepStrictEqual(user.length, 0);
        });

        it("Should have loggedIn of false", () => {
            const loggedIn = state.get().loggedIn;
            assert.typeOf(loggedIn, "boolean");
            assert.deepStrictEqual(loggedIn, false);
        });

        it("Should have empty token string", () => {
            const token = state.get().token;
            assert.typeOf(token, "string");
            assert.deepStrictEqual(token, "");
        });
    });

    describe("Set", () => {
        before(() => {
            state.set({
                loggedIn: true,
                token: testToken,
                user: testUser,
                shows: [testShow],
                showClasses: [testShowClass],
                riders: [testRider],
                users: [testUser]
            });
        });

        it("Should now have loggedIn of true", () => {
            const loggedIn = state.get().loggedIn;
            assert.typeOf(loggedIn, "boolean");
            assert.deepStrictEqual(loggedIn, true);
        });

        it("Should have empty token string", () => {
            const token = state.get().token;
            assert.typeOf(token, "string");
            assert.deepStrictEqual(token, "12345");
        });

        it("Should return an test user", () => {
            const user = state.get().user;
            assert.typeOf(user, "object");
            assert.deepStrictEqual(user.name, "test");
            assert.deepStrictEqual(user.email, "test@test.com");
            assert.deepStrictEqual(user.role, "user");
        });

        it("Should return list of 1 Show", () => {
            const shows = state.get().shows;
            assert.typeOf(shows, "Array");
            assert.deepStrictEqual(shows.length, 1);
            assert.deepEqual(shows[0], {
                showId: 0, name: "TestShow", showDate: "2020-02-01T07:00:00.000Z", distance: 100 });
        });

        it("Should return a list of 1 ShowClass", () => {
            const classes = state.get().showClasses;
            assert.typeOf(classes, "Array");
            assert.deepStrictEqual(classes.length, 1);
            assert.deepStrictEqual(classes[0], testShowClass);
        });

        it("Should return a list of 1 Rider", () => {
            const riders = state.get().riders;
            assert.typeOf(riders, "Array");
            assert.deepStrictEqual(riders.length, 1);
            assert.deepStrictEqual(riders[0], testRider);
        });

        it("Should return a list of 1 User", () => {
            const users = state.get().users;
            assert.typeOf(users, "Array");
            assert.deepStrictEqual(users.length, 1);
            assert.deepStrictEqual(users[0], testUser);
        });
    });

    describe("Session", () => {
        it("Should have empty session", () => {
            localStorage.setItem("session", "");
            checkForSession();

            const sessionState = state.get();
            assert.deepStrictEqual(
                {
                    token: sessionState.token,
                    user: sessionState.user,
                    loggedIn: sessionState.loggedIn
                },
                {
                    token: "",
                    user: emptyUser,
                    loggedIn: false
                });
        });
        it("Should have valid session", () => {
            localStorage.setItem("session", JSON.stringify({ token: testToken, user: testUser }));
            checkForSession();

            const sessionState = state.get();
            assert.deepStrictEqual(
                {
                    token: sessionState.token,
                    user: sessionState.user,
                    loggedIn: sessionState.loggedIn
                },
                {
                    token: "12345",
                    user: testUser,
                    loggedIn: true
                });
        });
    });
});
