import Vue, { PropType } from "vue";
import { state } from "../../../helpers";
import { IRider } from "../../../../shared";

export const ShowClassRow = Vue.extend({
    template: require("./show-class-row.html"),
    props: {
        showClass: Object as PropType<IRider>
    },
    data() { return state.get(); },
    created() { state.updateVue(this); },
    methods: {
        open() {
            this.$emit("open", this.showClass);
        },
        deleteModal() {
            this.$emit("deleteModal", this.showClass);
        }
    }
});
