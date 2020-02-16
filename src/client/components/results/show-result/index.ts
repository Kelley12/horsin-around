import Vue, { PropType } from "vue";
import { state } from "../../../state";
import { Show, prettyFormatDate } from "../../../../shared";
import { get, apiurl } from "../../../helpers";
import { ClassResult } from "../class-result";

export const ShowResult = Vue.extend({
    template: require("./show-result.html"),
    components: { ClassResult },
    props: {
        show: Object as PropType<Show>
    },
    data() {
        return {
            ...state.get(),
            showClassInfo: []
        };
    },
    created() { state.updateVue(this); },
    mounted() { this.getClasses(); },
    methods: {
        getClasses() {
            get(`${apiurl}/showclassinfo/byShow/${this.show.showId}`)
                .then((showClassInfo) => {
                    this.showClassInfo = showClassInfo;
                })
                .catch((e: Error) => console.log(e));
        },

        formatDate(uglyDate: string): string {
            return prettyFormatDate(uglyDate);
        }
    }
});
