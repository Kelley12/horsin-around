import Vue from "vue";
import { get, post, put, apiurl, del } from "../../../helpers";
import { prettyFormatDate } from "../../../../shared";

export const ShowClassInfoModal = Vue.extend({
    template: require("./show-class-info-modal.html"),
    props: ["showClassInfo", "deleteModal"],

    data(): {
        modalText: string,
        submitting: boolean,
        submitted: boolean,
        submitMessage: string,
        error: string,
        showClasses: []
    } {
        return {
            modalText: "Add",
            submitting: false,
            submitted: false,
            submitMessage: "Added",
            error: "",
            showClasses: []
        };
    },
    created() {
        this.getShowClasses();
    },
    mounted() {
        if (this.deleteModal) {
            this.modalText = "Terminate";
            this.submitMessage = "Terminated";
        } else if (this.showClassInfo.showId) {
            this.modalText = "Edit";
            this.submitMessage = "Edited";
        }
        this.showClassInfo.showDate = prettyFormatDate(this.showClassInfo.showDate);
    },
    methods: {
        submit() {
            if (this.submitting) return;
            this.submitting = true;

            if (this.deleteModal) {
                del(`${apiurl}/showClassInfo/${this.showClassInfo.showClassInfoId}`)
                    .then(() => {
                        this.$emit("refreshShow", this.showClassInfo.showId);
                        this.submitted = true;
                    })
                    .catch((e: Error) => this.error = e.message)
                    .then(() => this.submitting = false);
            } else if (this.showClassInfo.showClassInfoId) {
                put(`${apiurl}/showClassInfo/${this.showClassInfo.showClassInfoId}`, {
                    showClassInfoId: this.showClassInfo.showClassInfoId,
                    showId: this.showClassInfo.showId,
                    showClassId: this.showClassInfo.showClassId,
                    distance: this.showClassInfo.distance,
                    speed: this.showClassInfo.speed,
                    minutes: this.showClassInfo.minutes,
                    seconds: this.showClassInfo.seconds,
                    milliseconds: this.showClassInfo.milliseconds
                })
                    .then(() => {
                        this.$emit("refreshShow", this.showClassInfo.showId);
                        this.submitted = true;
                    })
                    .catch((e: Error) => this.error = e.message)
                    .then(() => this.submitting = false);
            } else {
                post(`${apiurl}/showClassInfo`, {
                    showId: this.showClassInfo.showId,
                    showClassId: this.showClassInfo.showClassId,
                    distance: this.showClassInfo.distance,
                    speed: this.showClassInfo.speed,
                    minutes: this.showClassInfo.minutes,
                    seconds: this.showClassInfo.seconds,
                    milliseconds: this.showClassInfo.milliseconds
                })
                    .then(() => {
                        this.$emit("refreshShow", this.showClassInfo.showId);
                        this.submitted = true;
                    })
                    .catch((e: Error) => this.error = e.message)
                    .then(() => this.submitting = false);
            }
        },

        getShowClasses() {
            get(`${apiurl}/class`)
            .then((classes) => this.showClasses = classes);
        },

        close() {
            this.$emit("close");
        }
    }
});
