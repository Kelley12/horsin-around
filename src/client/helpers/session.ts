import { State } from "./state";
import { Headers, Response } from "node-fetch";
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

export function clearSession() {
    localStorage.setItem("session", "");
    state.set({ loggedIn: false, token: "" });
}

export function signOut(router: VueRouter) {
    clearSession();
    if (router.currentRoute.path !== "/login") {
        router.push("/login");
    }
}

export const jsonHeader = new Headers();
jsonHeader.append("Content-Type", "application/json");

export const baseHeader = new Headers();

export function refreshJWT(res: Response) {
    const newToken = res.headers.get("new-token") || "";
    localStorage.setItem("session", JSON.stringify({ token: newToken }));
    state.set({ token: newToken });
    setAjaxToken(newToken);
}

export function setAjaxToken(token: string) {
    baseHeader.set("horsin-around-token", token);
    jsonHeader.set("horsin-around-token", token);
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
