import Vue from "vue";
import { ShowRow } from "../../components";
import { state } from "../../state";
import { get, apiurl } from "../../helpers";

export const ShowPage = Vue.extend({
    template: require("./shows.html"),
    components: { ShowRow },
    data() { return { ...state.get(), showsLoading: false }; },
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
    }
});
