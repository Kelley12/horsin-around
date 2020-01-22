import Vue, { PropType } from "vue";
import { state } from "../../state";
import { IShow } from "../../../shared";

export const ShowBox = Vue.extend({
    template: require("./show-box.html"),
    props: {
        show: Object as PropType<IShow>
    },
    data() { return state.get(); }
});
