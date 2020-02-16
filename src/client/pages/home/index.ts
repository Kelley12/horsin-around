import Vue from "vue";
import { ShowResult } from "../../components";
import { state } from "../../state";
import { emptyShow, prettyFormatDate, Show } from "../../../shared";
import { get, apiurl } from "../../helpers";

export const HomePage = Vue.extend({
    template: require("./home.html"),
    components: { ShowResult },
    data() { return {
        ...state.get(),
        show: emptyShow
    }; },
    created() { state.updateVue(this); },
    mounted() {
        this.getShow();
        this.loadShows();
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
        loadShows() {
            get(`${apiurl}/shows`)
                .then((shows) => {
                    state.set({shows});
                })
                .catch((e: Error) => console.log(e));
        },
        selectShow(show?: Show) {
            if (!show) {
                this.show = emptyShow;
                this.$router.push(`/`);
            } else {
                this.show = show;
                this.$router.push(`/home/${show.showId}`);
            }
        },
        getShow() {
            const showId = this.$route.params.showId;
            if (showId) {
                get(`${apiurl}/shows/${showId}`)
                    .then((show) => {
                        this.show = show;
                    })
                    .catch((e: Error) => console.log(e));
            } else {
                this.show = emptyShow;
            }
        },
        formatDate(uglyDate: string): string {
            return prettyFormatDate(uglyDate);
        }
    }
});
