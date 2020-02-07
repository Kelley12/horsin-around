import Vue from "vue";
import { ScoringRow, ShowEntryModal, ShowClassInfoModal } from "../../components";
import { Result, ShowClassInfoByShow, ShowClassInfo, emptyShowClassInfo } from "../../../shared";
import { state } from "../../state";
import { get, apiurl } from "../../helpers";

export const ScoringPage = Vue.extend({
    template: require("./scoring.html"),
    components: { ScoringRow, ShowEntryModal, ShowClassInfoModal },
    props: ["showId", "showClassId"],
    data(): {
        selectedShowId: number,
        selectedShowClassId: number,
        showClassInfo: ShowClassInfoByShow[],
        scores: Result[],
        showEntriesData: ShowClassInfo,
        showEntriesModal: boolean,
        showClassInfoModal: boolean
    } {
        return {
            ...state.get(),
            selectedShowId: this.showId,
            selectedShowClassId: this.showClassId,
            showClassInfo: [],
            scores: [],
            showEntriesData: emptyShowClassInfo,
            showEntriesModal: false,
            showClassInfoModal: false
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
                        this.setShowClassInfo();
                        this.loadScores();
                    }
                })
                .catch((e: Error) => console.log(e));
        },

        loadScores() {
            get(`${apiurl}/results/ByShow/${this.selectedShowId}/${this.selectedShowClassId}`)
                .then((results) => {
                    this.scores = results;
                    this.setShowClassInfo();
                })
                .catch((e: Error) => console.log(e));
        },

        setShowClassInfo() {
            get(`${apiurl}/showClassInfo/byShow/${this.selectedShowId}/${this.selectedShowClassId}`)
                .then((showClassInfo) => {
                    this.showEntriesData = showClassInfo;
                });
        },

        openEntryModal() {
            this.setShowClassInfo();
            this.showEntriesModal = true;
        },

        addEntry(result: Result) {
            get(`${apiurl}/riders/${result.riderId}`)
                .then((rider) => {
                    result.rider = rider;
                    this.scores.unshift(result);
                });
        },

        editEntry(resultId: number) {
            console.log(`Attempting to refresh score resultID: ${resultId}`);
            this.$children.forEach((scoringRow) => {
                if (scoringRow.$props.result.resultId === resultId) {
                    // @ts-ignore
                    scoringRow.refreshRow();
                }
            });
        },

        deleteEntry(resultId: number) {
            console.log(`Deleting score of resultId: ${resultId}`);
            this.scores.forEach((result, i) => {
                if (result.resultId === resultId) {
                    this.scores.splice(i, 1);
                }
            });
        },

        editShowClassInfo() {
            this.showClassInfoModal = true;
        }
    }
});
