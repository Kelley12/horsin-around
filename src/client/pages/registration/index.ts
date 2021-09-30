import Vue from "vue";
import { ShowResult } from "../../components";
import { state } from "../../state";
import { get, apiurl } from "../../helpers";
import { emptyShow, Show } from "../../../shared";

export const RegistrationPage = Vue.extend({
    template: require("./registration.html"),
    components: { ShowResult },
    data(): {
        show: Show,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        horseName: string,
        selectedClasses: { id: number, schooling: boolean }[],
        showClasses: any[],
        submitted: boolean,
        errors: string[],
        firstNameError: boolean,
        lastNameError: boolean,
        phoneNumberError: boolean,
        horseNameError: boolean,
        selectedClassesError: boolean,
    } {
        return {
            show: emptyShow,
            firstName: "",
            lastName: "",
            phoneNumber: "",
            horseName: "",
            selectedClasses: [{ id: 0, schooling: false }],
            showClasses: state.get().showClasses,
            submitted: false,
            errors: [],
            firstNameError: false,
            lastNameError: false,
            phoneNumberError: false,
            horseNameError: false,
            selectedClassesError: false,
        };
    },
    created() { state.updateVue(this); },
    mounted() {
        this.getShow();
        this.loadClasses();
    },
    methods: {
        getShow() {
            const showId = this.$route.params.showId;
            if (showId) {
                get(`${apiurl}/shows/${showId}`)
                    .then((show) => {
                        this.show = show;
                    })
                    .catch((e: Error) => console.log(e));
            }
        },
        loadClasses() {
            get(`${apiurl}/class`)
                .then((showClasses) => {
                    state.set({showClasses});
                })
                .catch((e: Error) => console.log(e));
        },
        addClass() {
            this.selectedClasses.push({ id: 0, schooling: false });
        },
        deleteClass(index: number) {
            this.selectedClasses.splice(index, 1);
        },
        clearErrors() {
            this.errors = [];
            this.firstNameError = false;
            this.lastNameError = false;
            this.phoneNumberError = false;
            this.horseNameError = false;
            this.selectedClassesError = false;
        },
        validateForm() {
            this.clearErrors();
            if (!this.firstName) {
                this.firstNameError = true;
                this.errors.push("Must enter first name");
            }
            if (!this.lastName) {
                this.lastNameError = true;
                this.errors.push("Must enter last name");
            }
            if (!this.phoneNumber) {
                this.phoneNumberError = true;
                this.errors.push("Must enter phone number");
            }
            if (!this.horseName) {
                this.horseNameError = true;
                this.errors.push("Must enter horse name");
            }
            if (this.selectedClasses.some(selectedClass => selectedClass.id < 1)) {
                this.selectedClassesError = true;
                this.errors.push("All classes must be selected");
            }

            return this.errors.length === 0;
        },
        submit() {
            if (this.validateForm()) {
                const rows = this.selectedClasses.map(selectedClass => {
                    return {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        phoneNumber: this.phoneNumber,
                        horseName: this.horseName,
                        classId: selectedClass.id,
                        schooling: selectedClass.schooling,
                        fee: 10,
                    };
                });
                console.log("Submitting:", rows);
                this.submitted = true;
            }
        }
    }
});
