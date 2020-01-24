import Vue from "vue";
import { post, put, apiurl, del } from "../../../helpers";
import { state } from "../../../state";

export const ShowClassModal = Vue.extend({
    template: require("./show-class-modal.html"),
    props: ["showClass", "deleteModal"],

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
        } else if (this.showClass.showClassId) {
            this.modalText = "Edit";
            this.submitMessage = "Edited";
        }
    },
    methods: {
        submit() {
            if (this.submitting) return;
            this.submitting = true;

            if (this.deleteModal) {
                del(`${apiurl}/showclass/${this.showClass.showClassId}`)
                    .then(() => {
                        const showClasses = state.get().showClasses;
                        showClasses.forEach((showClass, i) => {
                            if (showClass.showClassId === this.showClass.showClassId) {
                                showClasses.splice(i, 1);
                            }
                        });
                        state.set({ showClasses });
                        this.submitted = true;
                    })
                    .catch((e: Error) => this.error = e.message)
                    .then(() => this.submitting = false);
            } else if (this.showClass.showClassId) {
                put(`${apiurl}/showclass`, {
                    showClassId: this.showClass.showClassId,
                    name: this.showClass.name,
                    speed: this.showClass.speed
                })
                    .then(() => {
                        const showClasses = state.get().showClasses;
                        showClasses.forEach((showClass) => {
                            if (showClass.showClassId === this.showClass.showClassId) {
                                showClass.name = this.showClass.name;
                                showClass.speed = this.showClass.speed;
                            }
                        });
                        state.set({ showClasses });
                        this.submitted = true;
                    })
                    .catch((e: Error) => this.error = e.message)
                    .then(() => this.submitting = false);
            } else {
                post(`${apiurl}/showclass`, {
                    name: this.showClass.name,
                    speed: this.showClass.speed
                })
                    .then((showClass) => {
                        const showClasses = state.get().showClasses;
                        showClasses.push(showClass);
                        state.set({ showClasses });
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
