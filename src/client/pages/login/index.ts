import Vue from "vue";
import { LoginBox } from "../../components/login";

export const LoginPage = Vue.extend({
    template: require("./login.html"),
    components: { LoginBox }
});
