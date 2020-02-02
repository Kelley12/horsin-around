import Vue, { PropType } from "vue";
import { state } from "../../../state";
import { Show } from "../../../../shared";
import { get, apiurl } from "../../../helpers";

export const ShowRow = Vue.extend({
    template: require("./show-row.html"),
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
            get(`${apiurl}/showclassinfo/byshow/${this.show.showId}`)
                .then((showClassInfo) => {
                    this.showClassInfo = showClassInfo;
                })
                .catch((e: Error) => console.log(e));
        },

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
