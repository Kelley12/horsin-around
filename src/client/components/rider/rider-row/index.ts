import Vue, { PropType } from "vue";
import { state } from "../../../state";
import { IRider } from "../../../../shared";

export const RiderRow = Vue.extend({
    template: require("./rider-row.html"),
    props: {
        rider: Object as PropType<IRider>
    },
    data() { return state.get(); },
    created() { state.updateVue(this); },
    methods: {
        open() {
            this.$emit("open", this.rider);
        },
        deleteModal() {
            this.$emit("deleteModal", this.rider);
        }
    }
});
