import Vue from "vue";
import { state, signOut } from "../../helpers";
import { emptyUser } from "../../../shared";

export const Navbar = Vue.extend({
    template: require("./navbar.html"),
    data: () => state.get(),
    created() {
        this.user = this.user || emptyUser;
        state.updateVue(this);
    },

    methods: {
        signOut() {
            signOut(this.$router);
        }
    }
});
