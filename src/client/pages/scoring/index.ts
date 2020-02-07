import Vue from "vue";
import { ScoringRow } from "../../components";
import { Result } from "../../../shared";

export const ScoringPage = Vue.extend({
    template: require("./scoring.html"),
    components: { ScoringRow },
    data(): {
        scores: Result[]
    } {
        return {
            scores: []
        };
    },
    mounted() {
    },

    computed: {
        hasNoScores() {
            if (this.scores.length < 1) {
                return true;
            }
            return false;
        }
    },

    methods: {
    }
});
