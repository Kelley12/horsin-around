import Vue, { PropType } from "vue";
import { IResult } from "../../../../shared";

export const ScoringRow = Vue.extend({
    template: require("./scoring-row.html"),
    props: {
        result: Object as PropType<IResult>
    },
    methods: {
    }
});
