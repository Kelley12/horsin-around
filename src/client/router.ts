import VueRouter from "vue-router";
import { HomePage, LoginPage, ShowClassPage, RiderPage, AdminPage } from "./pages";
import { state, signOut, post, apiurl, clearSession } from "./helpers";

export const router = new VueRouter({
    linkActiveClass: "is-active",
    routes: [
        { path: "/", redirect: "/home", meta: { anon: true } },
        { path: "/home", component: HomePage, meta: { anon: true } },
        { path: "/login", component: LoginPage, meta: { anon: true } },
        { path: "/riders", component: RiderPage, meta: { anon: true } },
        { path: "/class", component: ShowClassPage, meta: { anon: true } },
        { path: "/admin", component: AdminPage, meta: { anon: true } }
    ]
});

router.beforeEach((to, _from, next) => {
    if (!state.get().loggedIn && !to.meta.anon && to.path !== "/login") {
        return next("/login");
    }

    next();
});

post(`${apiurl}/auth/session-is-valid`, { token: state.get().token })
    .then(sessionState => {
        if (sessionState.isValid) return;
        if (router.currentRoute.meta.anon) {
            clearSession();
            return;
        }
        return signOut(router);
    })
    .catch(e => console.log(e));
