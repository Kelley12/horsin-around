import Vue from "vue";
import { state, post, put, apiurl, del } from "../../../helpers";

export const RiderModal = Vue.extend({
    template: require("./rider-modal.html"),
    props: ["rider", "deleteModal"],

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
        } else if (this.rider.riderId) {
            this.modalText = "Edit";
            this.submitMessage = "Edited";
        }
    },
    methods: {
        submit() {
            if (this.submitting) return;
            this.submitting = true;

            if (this.deleteModal) {
                del(`${apiurl}/riders/${this.rider.riderId}`)
                    .then(() => {
                        const riders = state.get().riders;
                        riders.forEach((rider, i) => {
                            if (rider.riderId === this.rider.riderId) {
                                riders.splice(i, 1);
                            }
                        });
                        state.set({ riders });
                        this.submitted = true;
                    })
                    .catch((e: Error) => this.error = e.message)
                    .then(() => this.submitting = false);
            } else if (this.rider.riderId) {
                put(`${apiurl}/riders`, {
                    riderId: this.rider.riderId,
                    firstName: this.rider.firstName,
                    lastName: this.rider.lastName
                })
                    .then(() => {
                        const riders = state.get().riders;
                        riders.forEach((rider) => {
                            if (rider.riderId === this.rider.riderId) {
                                rider.firstName = this.rider.firstName;
                                rider.lastName = this.rider.lastName;
                            }
                        });
                        state.set({ riders });
                        this.submitted = true;
                    })
                    .catch((e: Error) => this.error = e.message)
                    .then(() => this.submitting = false);
            } else {
                post(`${apiurl}/riders`, {
                    firstName: this.rider.firstName,
                    lastName: this.rider.lastName
                })
                    .then((rider) => {
                        const riders = state.get().riders;
                        riders.push(rider);
                        state.set({ riders });
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
