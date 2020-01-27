import Vue from "vue";
import { post, apiurl, state, checkForSession } from "../../../helpers";
import { User } from "../../../../shared";

export const LoginBox = Vue.extend({
    template: require("./login.html"),
    data() {
        return {
            ...state.get(),
            email: "",
            password: "",
            error: "",
            loading: false,
        };
    },

    created() {
        state.updateVue(this);
    },

    methods: {
        submit() {
            this.error = "";
            if (this.loading) return;
            this.loading = true;
            post(`${apiurl}/auth/login`, {
                email: this.email,
                password: this.password
            })
                .then(({ token, user }: { token: string, user: User }) => {
                    localStorage.setItem("session", JSON.stringify({ token, user }));
                    checkForSession();
                    this.$router.push("/");
                })
                .catch((e: Error) => this.error = e.message)
                .then(() => this.loading = false);
        }
    }
});
