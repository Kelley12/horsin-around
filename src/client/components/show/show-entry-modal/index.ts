import Vue from "vue";
import { post, put, apiurl, get, del } from "../../../helpers";
import { Result, emptyResult, Rider } from "../../../../shared";

export const ShowEntryModal = Vue.extend({
    template: require("./show-entry-modal.html"),
    props: ["showClassInfo"],

    data(): {
        riders: Rider[],
        enteredRiders: Result[],
        result: Result,
        editMode: boolean,
        deleteMode: boolean,
        submitting: boolean,
        error: string
    } {
        return {
            riders: [],
            enteredRiders: [],
            result: emptyResult,
            editMode: false,
            deleteMode: false,
            submitting: false,
            error: ""
        };
    },
    mounted() {
        this.getEnteredRiders();
        this.getRiderList();
    },
    methods: {
        submit() {
            if (this.submitting) return;
            this.submitting = true;

            if (this.result.resultId) {
                put(`${apiurl}/results/${this.result.resultId}`, {
                    showId: this.showClassInfo.showId,
                    showClassId: this.showClassInfo.showClassId,
                    riderId: this.result.riderId,
                    horse: this.result.horse,
                    scored: this.result.scored
                })
                    .then(() => {
                        this.$emit("editEntry", this.result.resultId);
                        this.getEnteredRiders();
                        this.toggleEditMode();
                    })
                    .catch((e: Error) => this.error = e.message)
                    .then(() => this.submitting = false);
            } else {
                post(`${apiurl}/results`, {
                    showId: this.showClassInfo.showId,
                    showClassId: this.showClassInfo.showClassId,
                    riderId: this.result.riderId,
                    horse: this.result.horse,
                    scored: this.result.scored
                })
                    .then((newEntry) => {
                        this.$emit("addEntry", newEntry);
                        this.getEnteredRiders();
                        this.toggleEditMode();
                    })
                    .catch((e: Error) => this.error = e.message)
                    .then(() => this.submitting = false);
            }
        },

        deleteEntry() {
            if (this.submitting) return;
            this.submitting = true;

            del(`${apiurl}/results/${this.result.resultId}`)
                .then(() => {
                    this.$emit("deleteEntry", this.result.resultId);
                    this.getEnteredRiders();
                    this.toggleDeleteMode();
                })
                .catch((e: Error) => this.error = e.message)
                .then(() => this.submitting = false);
        },

        clearForm() {
            this.error = "";
            this.result.resultId = 0;
            this.result.riderId = 0;
            this.result.horse = "";
            this.result.scored = false;
        },

        getRiderList() {
            get(`${apiurl}/riders`)
                .then((riders) => this.riders = riders)
                .catch((e: Error) => this.error = e.message);
        },

        getEnteredRiders() {
            get(`${apiurl}/results/byShow/${this.showClassInfo.showId}/${this.showClassInfo.showClassId}`)
                .then((results) => this.enteredRiders = results)
                .catch((e: Error) => this.error = e.message);
        },

        editEntry(entry: Result) {
            this.result.resultId = entry.resultId;
            this.result.riderId = entry.riderId;
            this.result.horse = entry.horse;
            this.result.scored = entry.scored;

            this.toggleEditMode();
        },

        deleteEntryForm(entry: Result) {
            this.result.resultId = entry.resultId;

            this.toggleDeleteMode();
        },

        toggleEditMode() {
            this.editMode = !this.editMode;
            if (!this.editMode) this.clearForm();
        },

        toggleDeleteMode() {
            this.deleteMode = !this.deleteMode;
            if (!this.deleteMode) this.clearForm();
        },

        close() {
            this.$emit("close");
        }
    }
});
