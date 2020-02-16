import Vue, { PropType } from "vue";
import { state } from "../../../state";
import { ShowClassInfo } from "../../../../shared";
import { get, apiurl } from "../../../helpers";
import { ResultRow } from "../result-row";

export const ClassResult = Vue.extend({
    template: require("./class-result.html"),
    props: { showClassInfo: Object as PropType<ShowClassInfo> },
    components: { ResultRow },
    data() {
        return {
            ...state.get(),
            results: [],
            highlightPlaces: 0,
            onlyPlacings: true
        };
    },
    created() { state.updateVue(this); },
    mounted() {
        this.getShowClassPlacing();
        this.getShowAwardPlacings();
    },
    methods: {
        getShowClassPlacing() {
            get(`${apiurl}/results/placing/top/${this.showClassInfo.showId}/${this.showClassInfo.showClassId}`)
                .then((results) => {
                    this.results = results;
                    if (results.length < this.highlightPlaces) {
                        this.onlyPlacings = false;
                    }
                });
        },
        getShowAwardPlacings() {
            this.shows.forEach((show) => {
                if (show.showId === parseInt(this.$route.params.showId)) {
                    this.highlightPlaces = show.awardPlaces;
                }
            });
        },
        showAll() {
            get(`${apiurl}/results/placing/${this.showClassInfo.showId}/${this.showClassInfo.showClassId}`)
                .then((results) => {
                    this.results = results;
                    this.onlyPlacings = false;
                });
        }
    }
});
