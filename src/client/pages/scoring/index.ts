import Vue from "vue";
import { ScoringRow, ShowEntryModal } from "../../components";
import { Result, ShowClassInfoByShow, ShowClassInfo, emptyShowClassInfo } from "../../../shared";
import { state } from "../../state";
import { get, apiurl } from "../../helpers";

export const ScoringPage = Vue.extend({
    template: require("./scoring.html"),
    components: { ScoringRow, ShowEntryModal },
    props: ["showId", "showClassId"],
    data(): {
        selectedShowId: number,
        selectedShowClassId: number,
        showClassInfo: ShowClassInfoByShow[],
        scores: Result[],
        showEntriesData: ShowClassInfo,
        showEntriesModal: boolean
    } {
        return {
            ...state.get(),
            selectedShowId: this.showId,
            selectedShowClassId: this.showClassId,
            showClassInfo: [],
            scores: [],
            showEntriesData: emptyShowClassInfo,
            showEntriesModal: false
        };
    },
    created() { state.updateVue(this); },
    mounted() {
        this.loadShows();
    },

    computed: {
        hasNoScores() {
            if (this.scores.length < 1) {
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
                    if (!this.selectedShowClassId) this.loadShowClasses();
                })
                .catch((e: Error) => console.log(e));
        },

        loadShowClasses() {
            get(`${apiurl}/showclassinfo/ByShow/${this.selectedShowId}`)
                .then((showClassInfo) => {
                    this.showClassInfo = showClassInfo;
                    if (this.showClassInfo[0]) {
                        this.selectedShowClassId = this.showClassInfo[0].showClass.showClassId;
                        this.loadScores();
                    }
                })
                .catch((e: Error) => console.log(e));
        },

        loadScores() {
            get(`${apiurl}/results/ByShow/${this.selectedShowId}/${this.selectedShowClassId}`)
                .then((results) => {
                    this.scores = results;
                })
                .catch((e: Error) => console.log(e));
        },

        openEntryModal() {
            get(`${apiurl}/showClassInfo/byShow/${this.selectedShowId}/${this.selectedShowClassId}`)
                .then((showClassInfo) => this.showEntriesData = showClassInfo)
                .then(() => this.showEntriesModal = true);
        }
    }
});
