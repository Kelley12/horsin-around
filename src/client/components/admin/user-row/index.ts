import Vue, { PropType } from "vue";
import { state } from "../../../state";
import { IUser } from "../../../../shared";

export const UserRow = Vue.extend({
    template: require("./user-row.html"),
    props: {
        userRow: Object as PropType<IUser>
    },
    data() { return state.get(); },
    created() { state.updateVue(this); },
    methods: {
        open() {
            this.$emit("open", this.userRow);
        },

        deleteModal() {
            this.$emit("deleteModal", this.userRow);
        },

        changePassword() {
            this.$emit("changePassword", this.userRow);
        }
    }
});
