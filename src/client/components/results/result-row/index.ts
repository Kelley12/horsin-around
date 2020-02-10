import Vue, { PropType } from "vue";
import { Result } from "../../../../shared";

export const ResultRow = Vue.extend({
    template: require("./result-row.html"),
    props: {
        result: Object as PropType<Result>,
        index: Number
    }
});
