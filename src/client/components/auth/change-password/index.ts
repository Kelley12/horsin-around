import Vue from "vue";
import { post, apiurl, state } from "../../../helpers";

export const ChangePasswordModal = Vue.extend({
    template: require("./change-password.html"),
    props: ["adminModal", "user"],

    data() {
        return {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            error: "",
            submitting: false,
            submitted: false,
        };
    },

    created() {
        state.updateVue(this);
    },

    methods: {
        submit() {
            this.error = "";

            if (this.submitting) return;
            this.submitting = true;

            if (this.newPassword !== this.confirmPassword) {
                this.error = "New password and confirmation do not match.";
                this.submitting = false;
                return;
            }

            post(`${apiurl}/auth/change-password`, {
                userId: this.user.userId,
                currentPassword: this.currentPassword,
                newPassword: this.newPassword,
                confirmPassword: this.confirmPassword
            })
                .then(() => {
                    this.submitted = true;
                })
                .catch((e: Error) => this.error = e.message)
                .then(() => this.submitting = false);
        },

        close() {
            this.$emit("close");
        }
    }
});
