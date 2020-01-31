import Vue from "vue";
import { post, put, apiurl, del } from "../../../helpers";
import { state } from "../../../state";

export const ShowModal = Vue.extend({
    template: require("./show-modal.html"),
    props: ["show", "deleteModal"],

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
        } else if (this.show.showId) {
            this.modalText = "Edit";
            this.submitMessage = "Edited";
        }
    },
    methods: {
        submit() {
            if (this.submitting) return;
            this.submitting = true;

            if (this.deleteModal) {
                del(`${apiurl}/shows/${this.show.showId}`)
                    .then(() => {
                        const shows = state.get().shows;
                        shows.forEach((show, i) => {
                            if (show.showId === this.show.showId) {
                                shows.splice(i, 1);
                            }
                        });
                        state.set({ shows });
                        this.submitted = true;
                    })
                    .catch((e: Error) => this.error = e.message)
                    .then(() => this.submitting = false);
            } else if (this.show.showId) {
                put(`${apiurl}/shows`, {
                    showId: this.show.showId,
                    firstName: this.show.firstName,
                    lastName: this.show.lastName
                })
                    .then(() => {
                        const shows = state.get().shows;
                        shows.forEach((show) => {
                            if (show.showId === this.show.showId) {
                                show.firstName = this.show.firstName;
                                show.lastName = this.show.lastName;
                            }
                        });
                        state.set({ shows });
                        this.submitted = true;
                    })
                    .catch((e: Error) => this.error = e.message)
                    .then(() => this.submitting = false);
            } else {
                post(`${apiurl}/shows`, {
                    firstName: this.show.firstName,
                    lastName: this.show.lastName
                })
                    .then((show) => {
                        const shows = state.get().shows;
                        shows.push(show);
                        state.set({ shows });
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
