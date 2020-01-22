import Vue from "vue";
import VueRouter from "vue-router";
import { router } from "./router";
import { Navbar } from "./components/navbar";

Vue.use(VueRouter);

const app = new Vue({
    router,
    components: {
        Navbar
    }
});

app.$mount("#app");
