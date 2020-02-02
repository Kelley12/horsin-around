import Vue from "vue";
import { ShowRow, ShowModal } from "../../components";
import { state } from "../../state";
import { get, apiurl } from "../../helpers";
import { emptyShow, Show } from "../../../shared";

export const ShowPage = Vue.extend({
    template: require("./shows.html"),
    components: { ShowRow, ShowModal },
    data() { return {
        ...state.get(),
        showsLoading: false,
        showModal: false,
        show: emptyShow,
        deleteModal: false
    }; },
    created() { state.updateVue(this); },
    mounted() {
        get(`${apiurl}/shows`)
            .then((shows) => {
                state.set({shows});
            })
            .catch((e: Error) => console.log(e))
            .then(() => this.showsLoading = false);
    },

    computed: {
        hasNoShows() {
            if (this.shows.length < 1) {
                return true;
            }
            return false;
        }
    },

    methods: {
        openModal(show?: Show) {
            if (show) this.setShow(show);
            else this.resetShow();
            this.deleteModal = false;
            this.showModal = true;
        },
        setShow(show: Show) {
            this.show.showId = show.showId;
            this.show.name = show.name;
            this.show.showDate = show.showDate;
        },
        resetShow() {
            this.show.showId = 0;
            this.show.name = "";
            this.show.showDate = new Date();
        },
        deleteShow(show: Show) {
            this.setShow(show);
            this.deleteModal = true;
            this.showModal = true;
        }
    }
});
