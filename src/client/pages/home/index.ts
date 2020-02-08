import Vue from "vue";
import { ShowResult } from "../../components";
import { state } from "../../state";
import { get, apiurl } from "../../helpers";

export const HomePage = Vue.extend({
    template: require("./home.html"),
    components: { ShowResult },
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
