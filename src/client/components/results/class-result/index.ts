import Vue, { PropType } from "vue";
import { state } from "../../../state";
import { ShowClassInfo } from "../../../../shared";
import { get, apiurl } from "../../../helpers";
import { ResultRow } from "../result-row";

export const ClassResult = Vue.extend({
    template: require("./class-result.html"),
    props: { showClassInfo: Object as PropType<ShowClassInfo> },
    components: { ResultRow },
    data() {
        return {
            ...state.get(),
            placings: []
        };
    },
    created() { state.updateVue(this); },
    mounted() { this.getShowClassPlacing(); },
    methods: {
        getShowClassPlacing() {
            get(`${apiurl}/results/byShow/${this.showClassInfo.showId}/${this.showClassInfo.showClassId}`)
                .then((placings) => this.placings = placings);
        }
    }
});
