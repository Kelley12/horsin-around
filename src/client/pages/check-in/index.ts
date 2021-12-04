import Vue from "vue";
import { state } from "../../state";
import { get, apiurl } from "../../helpers";
import { CheckInRow } from "../../components/check-in";
import { Entry } from "../../../shared";

export const CheckInPage = Vue.extend({
    template: require("./check-in.html"),
    components: { CheckInRow },
    props: ["showId"],
    data(): {
        selectedShowId: number,
        entries: Entry[],
    } {
        return {
            ...state.get(),
            selectedShowId: this.showId,
            entries: [],
        };
    },
    created() { state.updateVue(this); },
    mounted() {
        this.loadShows();
    },

    computed: {
        hasNoEntries() {
            if (this.entries.length < 1) {
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
                    if (!this.selectedShowId) this.selectedShowId = shows[0].showId;
                    this.loadEntries();
                })
                .catch((e: Error) => console.log(e));
        },
        loadEntries() {
            get(`${apiurl}/entry/${this.selectedShowId}`)
                .then((entries) => {
                    state.set({entries});
                    this.entries = entries;
                })
                .catch((e: Error) => console.log(e));
        }
    }
});
