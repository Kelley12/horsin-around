import { State } from "./state";
import { setAjaxToken } from "./ajax";
import { emptyUser } from "../../shared";
import VueRouter from "vue-router";
const localStorage = require("localStorage");

export const state = new State({
    loggedIn: false,
    token: "",
    user: emptyUser,
    shows: [] as any[],
    riders: [] as any[],
    showClasses: [] as any[],
    users: [] as any[]
});

export function signOut(router: VueRouter) {
    localStorage.setItem("session", "");
    state.set({ loggedIn: false, token: "" });
    router.push("/login");
}

export function checkForSession() {
    const session = localStorage.getItem("session");
    if (!session) {
        state.set({ token: "", user: emptyUser, loggedIn: false });
        return;
    }

    const { token, user } = JSON.parse(session);
    state.set({ token, user, loggedIn: true });
    setAjaxToken(token);
}

checkForSession();
