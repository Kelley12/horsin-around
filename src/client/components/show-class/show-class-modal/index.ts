import Vue from "vue";
import { post, put, apiurl, del } from "../../../helpers";
import { state } from "../../../state";
import _ from "lodash";

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
                del(`${apiurl}/class/${this.showClass.showClassId}`)
                    .then(() => {
                        const showClasses = state.get().showClasses;
                        _.remove(showClasses, { showClassId: this.showClass.showClassId });
                        state.set({ showClasses });
                        this.submitted = true;
                    })
                    .catch((e: Error) => this.error = e.message)
                    .then(() => this.submitting = false);
            } else if (this.showClass.showClassId) {
                put(`${apiurl}/class/${this.showClass.showClassId}`, {
                    showClassId: this.showClass.showClassId,
                    name: this.showClass.name
                })
                    .then(() => {
                        const showClasses = state.get().showClasses;
                        showClasses.forEach((showClass) => {
                            if (showClass.showClassId === this.showClass.showClassId) {
                                showClass.name = this.showClass.name;
                            }
                        });
                        state.set({ showClasses });
                        this.submitted = true;
                    })
                    .catch((e: Error) => this.error = e.message)
                    .then(() => this.submitting = false);
            } else {
                post(`${apiurl}/class`, {
                    name: this.showClass.name
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
            this.$emit("submitted");
        },

        close() {
            this.$emit("close");
        }
    }
});
