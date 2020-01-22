import { state } from "../state";
import { assert } from "chai";

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
                token: "12345",
                user: { name: "test", email: "test@test.com" }
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
});
