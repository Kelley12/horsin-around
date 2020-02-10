import Vue, { PropType } from "vue";
import { Result } from "../../../../shared";

export const ResultRow = Vue.extend({
    template: require("./result-row.html"),
    props: {
        result: Object as PropType<Result>,
        index: Number
    },
    methods: {
        formatSeconds(seconds: number): string {
            return seconds > 9 ? `${seconds}` : `0${seconds}`;
        }
    }
});
