import Vue from "vue";
import { ShowClassRow, ShowClassModal } from "../../components";
import { state, get, apiurl } from "../../helpers";
import { ShowClass, emptyShowClass } from "../../../shared";

export const ShowClassPage = Vue.extend({
    template: require("./show-classes.html"),
    components: { ShowClassRow, ShowClassModal },
    data() {
        return {
            ...state.get(),
            showClassLoading: false,
            showClassModal: false,
            showClass: emptyShowClass,
            deleteModal: false
        };
    },
    created() { state.updateVue(this); },
    mounted() {
        get(`${apiurl}/class`)
            .then((showClasses) => {
                state.set({showClasses});
            })
            .catch((e: Error) => console.log(e))
            .then(() => this.showClassLoading = false);
    },

    computed: {
        hasNoShowClasses() {
            if (this.showClasses.length < 1) {
                return true;
            }
            return false;
        }
    },

    methods: {
        openModal(showClass?: ShowClass) {
            if (showClass) this.setShowClass(showClass);
            else this.resetShowClass();
            this.deleteModal = false;
            this.showClassModal = true;
        },
        setShowClass(showClass: ShowClass) {
            this.showClass.showClassId = showClass.showClassId;
            this.showClass.name = showClass.name;
            this.showClass.speed = showClass.speed;
        },
        resetShowClass() {
            this.showClass.showClassId = 0;
            this.showClass.name = "";
            this.showClass.speed = 0;
        },
        deleteShowClass(showClass: ShowClass) {
            this.setShowClass(showClass);
            this.deleteModal = true;
            this.showClassModal = true;
        }
    }
});
