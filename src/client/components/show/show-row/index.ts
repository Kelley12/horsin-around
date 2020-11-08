import Vue, { PropType } from "vue";
import { state } from "../../../state";
import { Show, prettyFormatDate, ShowClassInfo } from "../../../../shared";
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
            get(`${apiurl}/showclassinfo/byShow/${this.show.showId}`)
                .then((showClassInfo) => {
                    this.showClassInfo = showClassInfo;
                })
                .catch((e: Error) => console.log(e));
        },

        addClass() {
            this.$emit("addClass", this.show);
        },

        editClass(showClassInfo: ShowClassInfo) {
            this.$emit("editClass", showClassInfo);
        },

        deleteClass(showClassInfo: ShowClassInfo) {
            this.$emit("deleteClass", showClassInfo);
        },

        showEntries(showClassInfo: ShowClassInfo) {
            this.$emit("showEntries", showClassInfo);
        },

        open() {
            this.$emit("open", this.show);
        },

        deleteModal() {
            this.$emit("deleteModal", this.show);
        },

        formatDate(uglyDate: string): string {
            return prettyFormatDate(uglyDate);
        }
    }
});
