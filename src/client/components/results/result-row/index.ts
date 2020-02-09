import Vue, { PropType } from "vue";
import { Placing } from "../../../../shared";

export const ResultRow = Vue.extend({
    template: require("./result-row.html"),
    props: { placing: Object as PropType<Placing> }
});
