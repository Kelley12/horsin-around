import Vue, { PropType } from "vue";
import { state } from "../../../state";
import { ShowClassInfo } from "../../../../shared";
import { get, apiurl } from "../../../helpers";

export const ClassResult = Vue.extend({
    template: require("./class-result.html"),
    props: {
        showClassInfo: Object as PropType<ShowClassInfo>
    },
    data() {
        return {
            ...state.get(),
            showClassResults: []
        };
    },
    created() { state.updateVue(this); },
    mounted() { this.getShowClassResults(); },
    methods: {
        getShowClassResults() {
            get(`${apiurl}/results/byShow/${this.showClassInfo.showId}/${this.showClassInfo.showClassId}`)
                .then((results) => this.showClassResults = results);
        }
    }
});
