import Vue from "vue";
import { post, put, apiurl, del } from "../../../helpers";
import { state } from "../../../state";

export const UserModal = Vue.extend({
    template: require("./user-modal.html"),
    props: ["user", "deleteModal"],

    data(): {
        modalText: string,
        submitting: boolean,
        submitted: boolean,
        submitMessage: string,
        error: string
    } {
        return {
            modalText: "Add",
            submitting: false,
            submitted: false,
            submitMessage: "Added",
            error: ""
        };
    },
    mounted() {
        if (this.deleteModal) {
            this.modalText = "Terminate";
            this.submitMessage = "Terminated";
        } else if (this.user.userId) {
            this.modalText = "Edit";
            this.submitMessage = "Edited";
        }
    },
    methods: {
        submit() {
            if (this.submitting) return;
            this.submitting = true;

            if (this.deleteModal) {
                del(`${apiurl}/users/${this.user.userId}`)
                    .then(() => {
                        const users = state.get().users;
                        users.forEach((user, i) => {
                            if (user.userId === this.user.userId) {
                                users.splice(i, 1);
                            }
                        });
                        state.set({ users });
                        this.submitted = true;
                    })
                    .catch((e: Error) => this.error = e.message)
                    .then(() => this.submitting = false);
            } else if (this.user.userId) {
                put(`${apiurl}/users`, {
                    userId: this.user.userId,
                    name: this.user.name,
                    email: this.user.email
                })
                    .then(() => {
                        const users = state.get().users;
                        users.forEach((user) => {
                            if (user.userId === this.user.userId) {
                                user.name = this.user.name;
                                user.email = this.user.email;
                            }
                        });
                        state.set({ users });
                        this.submitted = true;
                    })
                    .catch((e: Error) => this.error = e.message)
                    .then(() => this.submitting = false);
            } else {
                post(`${apiurl}/users`, {
                    name: this.user.name,
                    email: this.user.email
                })
                    .then((user) => {
                        const users = state.get().users;
                        users.push(user);
                        state.set({ users });
                        this.submitted = true;
                    })
                    .catch((e: Error) => this.error = e.message)
                    .then(() => this.submitting = false);
            }
        },

        close() {
            this.$emit("close");
        }
    }
});
