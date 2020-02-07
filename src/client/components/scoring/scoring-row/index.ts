import Vue, { PropType } from "vue";
import { Result } from "../../../../shared";
import { put, apiurl } from "../../../helpers";

export const ScoringRow = Vue.extend({
    template: require("./scoring-row.html"),
    props: {
        result: Object as PropType<Result>
    },
    data() {
        return {
            isUnsaved: false
        };
    },
    methods: {
        save() {
            put(`${apiurl}/results/${this.result.resultId}`, {
                showId: this.result.showId,
                showClassId: this.result.showClassId,
                riderId: this.result.riderId,
                minutes: this.result.minutes,
                seconds: this.result.seconds,
                milliseconds: this.result.milliseconds,
                faults: this.result.faults
            })
                .then(() => this.isUnsaved = false)
                .catch((e: Error) => this.$emit("error", e.message));
        },

        unsavedChange() {
            this.isUnsaved = true;
        }
    }
});
