import Vue, { PropType } from "vue";
import { Result } from "../../../../shared";
import { put, apiurl, get } from "../../../helpers";

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
                faults: this.result.faults,
                timePenalty: this.result.timePenalty,
                eliminated: this.result.eliminated
            })
                .then(() => this.isUnsaved = false)
                .catch((e: Error) => this.$emit("error", e.message));
        },

        unsavedChange() {
            this.isUnsaved = true;
        },

        refreshRow() {
            get(`${apiurl}/results/${this.result.resultId}`)
                .then((result: Result) => {
                    this.result.riderNumber = result.riderNumber;
                    this.result.horse = result.horse;
                    this.result.scored = result.scored;
                    this.result.minutes = result.minutes;
                    this.result.seconds = result.seconds;
                    this.result.milliseconds = result.milliseconds;
                    this.result.faults = result.faults;
                    this.result.timePenalty = result.timePenalty;
                    this.result.eliminated = result.eliminated;
                    this.isUnsaved = false;
                });
        }
    }
});
