import Vue from "vue";
import { ShowBox } from "../../components";
import { state, get, apiurl } from "../../helpers";

export const HomePage = Vue.extend({
    template: require("./home.html"),
    components: { ShowBox },
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
