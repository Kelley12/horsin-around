import { State, setAjaxToken } from "./helpers";
import { User, IShow } from "../shared";
const localStorage = require("localStorage");

const emptyUser: User = {
    email: "",
    name: ""
};

export const state = new State({
    loggedIn: false,
    token: "",
    user: emptyUser,
    shows: {} as { [id: string]: IShow }
});

// export function signOut(router: VueRouter) {
//     localStorage.setItem("session", "");
//     state.set({ loggedIn: false, token: "" });
//     router.push("/login");
// }

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
