import Vue from "vue";
import { ShowRow, ShowModal, ShowClassInfoModal } from "../../components";
import { state } from "../../state";
import { get, apiurl } from "../../helpers";
import { emptyShow, Show, emptyShowClassInfo, ShowClassInfo } from "../../../shared";

export const ShowPage = Vue.extend({
    template: require("./shows.html"),
    components: { ShowRow, ShowModal, ShowClassInfoModal },
    data() { return {
        ...state.get(),
        showsLoading: false,
        showModal: false,
        showClassInfoModal: false,
        show: emptyShow,
        showClassInfo: emptyShowClassInfo,
        deleteModal: false
    }; },
    created() { state.updateVue(this); },
    mounted() {
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
                .catch((e: Error) => console.log(e))
                .then(() => this.showsLoading = false);
        },
        refreshShow(showId: number) {
            this.$children.forEach((showRow) => {
                if (showRow.$props.show && showRow.$props.show.showId === showId) {
                    // @ts-ignore
                    showRow.getClasses();
                }
            });
        },
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
        },
        openShowInfoModal(showClassInfo?: ShowClassInfo, showId?: number) {
            if (showClassInfo) this.setShowClassInfo(showClassInfo);
            else {
                this.showClassInfo.showId = showId || 0;
                this.resetShowClassInfo();
            }
            this.deleteModal = false;
            this.showClassInfoModal = true;
        },
        setShowClassInfo(showClassInfo: ShowClassInfo) {
            this.showClassInfo.showClassInfoId = showClassInfo.showClassInfoId;
            this.showClassInfo.showId = showClassInfo.showId;
            this.showClassInfo.showClassId = showClassInfo.showClassId;
            this.showClassInfo.distance = showClassInfo.distance;
            this.showClassInfo.speed = showClassInfo.speed;
            this.showClassInfo.minutes = showClassInfo.minutes;
            this.showClassInfo.seconds = showClassInfo.seconds;
            this.showClassInfo.milliseconds = showClassInfo.milliseconds;
        },
        resetShowClassInfo() {
            this.showClassInfo.showClassInfoId = 0;
            this.showClassInfo.showClassId = 0;
            this.showClassInfo.distance = 0;
            this.showClassInfo.speed = 0;
            this.showClassInfo.minutes = 0;
            this.showClassInfo.seconds = 0;
            this.showClassInfo.milliseconds = 0;
        },
        deleteShowInfoModal(showClassInfo: ShowClassInfo) {
            this.setShowClassInfo(showClassInfo);
            this.deleteModal = true;
            this.showClassInfoModal = true;
        }
    }
});
