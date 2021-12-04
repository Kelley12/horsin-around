import Vue, { PropType } from "vue";
import { state } from "../../../state";
import { Entry } from "../../../../shared";
import { apiurl, put } from "../../../helpers";

export const CheckInRow = Vue.extend({
    template: require("./check-in-row.html"),
    props: {
        entry: Object as PropType<Entry>
    },
    data() { return state.get(); },
    created() { state.updateVue(this); },
    methods: {
        checkInRider() {
            put(`${apiurl}/entry`, { entry: this.entry })
                .catch((e: Error) => console.log(e));
        }
    }
});
