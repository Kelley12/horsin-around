import Vue from "vue";
import { state, signOut } from "../../helpers";

export const Navbar = Vue.extend({
    template: require("./navbar.html"),
    data: () => state.get(),
    created() { state.updateVue(this); },

    methods: {
        signOut() {
            signOut(this.$router);
        }
    }
});
