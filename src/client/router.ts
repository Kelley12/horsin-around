import VueRouter from "vue-router";
import { 
    HomePage,
    LoginPage,
    ShowPage,
    ShowClassPage,
    RiderPage,
    ScoringPage,
    AdminPage,
    RegistrationPage
} from "./pages";
import { state } from "./state";
// import { post, apiurl } from "./helpers";

export const router = new VueRouter({
    linkActiveClass: "is-active",
    routes: [
        { path: "/", redirect: "/home", meta: { anon: true } },
        { path: "/home", component: HomePage, meta: { anon: true } },
        { path: "/home/:showId", component: HomePage, meta: { anon: true } },
        { path: "/login", component: LoginPage, meta: { anon: false } },
        { path: "/shows", component: ShowPage, meta: { anon: false } },
        { path: "/riders", component: RiderPage, meta: { anon: false } },
        { path: "/class", component: ShowClassPage, meta: { anon: false } },
        { path: "/scoring", component: ScoringPage, meta: { anon: false } },
        { path: "/admin", component: AdminPage, meta: { anon: false } },
        { path: "/registration", component: RegistrationPage, meta: { anon: true } },
        { path: "/registration/:showId", component: RegistrationPage, meta: { anon: true } },
    ]
});

router.beforeEach((to, _from, next) => {
    if (!state.get().loggedIn && !to.meta.anon && to.path !== "/login") {
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
