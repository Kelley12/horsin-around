import Vue from "vue";
import { post, put, apiurl, del } from "../../../helpers";
import { state } from "../../../state";
import { prettyFormatDate } from "../../../../shared";

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
        this.show.showDate = prettyFormatDate(this.show.showDate);
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
                put(`${apiurl}/shows/${this.show.showId}`, {
                    showId: this.show.showId,
                    name: this.show.name,
                    showDate: this.show.showDate
                })
                    .then(() => {
                        const shows = state.get().shows;
                        shows.forEach((show) => {
                            if (show.showId === this.show.showId) {
                                show.name = this.show.name;
                                show.showDate = this.show.showDate;
                            }
                        });
                        state.set({ shows });
                        this.submitted = true;
                    })
                    .catch((e: Error) => this.error = e.message)
                    .then(() => this.submitting = false);
            } else {
                post(`${apiurl}/shows`, {
                    name: this.show.name,
                    showDate: this.show.showDate
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
