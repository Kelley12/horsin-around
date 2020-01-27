import VueRouter from "vue-router";
import { HomePage, LoginPage, ShowClassPage, RiderPage, AdminPage } from "./pages";
import { state, signOut, post, apiurl } from "./helpers";

export const router = new VueRouter({
    linkActiveClass: "is-active",
    routes: [
        { path: "/", redirect: "/home", meta: { admin: false } },
        { path: "/home", component: HomePage, meta: { admin: false } },
        { path: "/login", component: LoginPage, meta: { admin: false } },
        { path: "/riders", component: RiderPage, meta: { admin: false } },
        { path: "/class", component: ShowClassPage, meta: { admin: false } },
        { path: "/admin", component: AdminPage, meta: { admin: false } }
    ]
});

router.beforeEach((to, _from, next) => {
    if (!state.get().loggedIn && to.meta.admin && to.path !== "/login") {
        return next("/login");
    }

    next();
});

post(`${apiurl}/auth/session-is-valid`, { token: state.get().token })
    .then(sessionState => {
        if (sessionState.isValid) return;
        return signOut(router);
    })
    .catch(e => console.log(e));
