import Vue from "vue";
import { RiderRow, RiderModal } from "../../components";
import { state } from "../../state";
import { get, apiurl } from "../../helpers";
import { Rider, emptyRider } from "../../../shared";

export const RiderPage = Vue.extend({
    template: require("./riders.html"),
    components: { RiderRow, RiderModal },
    data() {
        return {
            ...state.get(),
            ridersLoading: false,
            riderModal: false,
            rider: emptyRider,
            deleteModal: false,
            allRiders: [],
            riderFilter: ""
        };
    },
    created() { state.updateVue(this); },
    mounted() {
        get(`${apiurl}/riders`)
            .then((riders) => {
                state.set({riders});
                this.allRiders = riders;
            })
            .catch((e: Error) => console.log(e))
            .then(() => this.ridersLoading = false);
    },

    computed: {
        hasNoRiders() {
            if (this.riders.length < 1) {
                return true;
            }
            return false;
        }
    },

    methods: {
        openModal(rider?: Rider) {
            if (rider) this.setRider(rider);
            else this.resetRider();
            this.deleteModal = false;
            this.riderModal = true;
        },
        setRider(rider: Rider) {
            this.rider.riderId = rider.riderId;
            this.rider.firstName = rider.firstName;
            this.rider.lastName = rider.lastName;
        },
        resetRider() {
            this.rider.riderId = 0;
            this.rider.firstName = "";
            this.rider.lastName = "";
        },
        deleteRider(rider: Rider) {
            this.setRider(rider);
            this.deleteModal = true;
            this.riderModal = true;
        },
        filterRiders() {
            if (this.riderFilter.length < 2 || !this.riderFilter) {
                this.riders = this.allRiders;
            } else {
                this.riders = this.riders.filter(rider =>
                    rider.firstName.toLowerCase().includes(this.riderFilter.toLowerCase())
                    || rider.lastName.toLowerCase().includes(this.riderFilter.toLowerCase()));
            }
        }
    }
});
