import VueRouter from "vue-router";
import { HomePage, LoginPage, ShowPage, ShowClassPage, RiderPage, ScoringPage } from "./pages";
import { state } from "./state";
// import { post, apiurl } from "./helpers";

export const router = new VueRouter({
    linkActiveClass: "is-active",
    routes: [
        { path: "/", redirect: "/home", meta: { admin: false } },
        { path: "/home", component: HomePage, meta: { admin: false } },
        { path: "/home/:showId", component: HomePage, meta: { admin: false } },
        { path: "/login", component: LoginPage, meta: { admin: false } },
        { path: "/shows", component: ShowPage, meta: { admin: false } },
        { path: "/riders", component: RiderPage, meta: { admin: false } },
        { path: "/class", component: ShowClassPage, meta: { admin: false } },
        { path: "/scoring", component: ScoringPage, meta: { admin: false } }
    ]
});

router.beforeEach((to, _from, next) => {
    if (!state.get().loggedIn && to.meta.admin && to.path !== "/login") {
        return next("/login");
    }

    next();
});

// post(`${apiurl}/session-is-valid`, { token: state.get().token })
//     .then(sessionState => {
//         if (sessionState.isValid) return;
//         return signOut(router);
//     })
//     .catch(e => console.log(e));
