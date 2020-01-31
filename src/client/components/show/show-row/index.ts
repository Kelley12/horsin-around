import Vue, { PropType } from "vue";
import { state } from "../../../state";
import { IShow } from "../../../../shared";

export const ShowRow = Vue.extend({
    template: require("./show-row.html"),
    props: {
        show: Object as PropType<IShow>
    },
    data() { return state.get(); },
    created() { state.updateVue(this); },
    methods: {
        open() {
            this.$emit("open", this.show);
        },

        deleteModal() {
            this.$emit("deleteModal", this.show);
        },

        prettyFormatDate(uglyDate: Date) {
            const date = new Date(uglyDate);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const year = date.getFullYear();
            return `${month}/${day}/${year}`;
        }
    }
});