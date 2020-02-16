import { state, checkForSession } from "../state";
import { assert } from "chai";
import { emptyUser } from "../../shared";
const localStorage = require("localStorage");

const testToken = "12345";
const testUser = { userId: 0, name: "test", email: "test@test.com", role: "user" };

describe("State", () => {
    describe("Get", () => {
        it("Should return an empty user", () => {
            const user = state.get().user;
            assert.typeOf(user, "object");
            assert.deepStrictEqual(user.name, "");
            assert.deepStrictEqual(user.email, "");
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
                user: testUser
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
                    loggedIn: process.env.NODE_ENV === "development" ? true : false
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
