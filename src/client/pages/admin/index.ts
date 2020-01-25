import Vue from "vue";
import { UserRow, UserModal } from "../../components";
import { state } from "../../state";
import { get, apiurl } from "../../helpers";
import { User, emptyUser } from "../../../shared";

export const AdminPage = Vue.extend({
    template: require("./admin.html"),
    components: { UserRow, UserModal },
    data() {
        return {
            ...state.get(),
            usersLoading: false,
            userModal: false,
            user: emptyUser,
            deleteModal: false,
            changePasswordModal: false
        };
    },
    created() { state.updateVue(this); },
    mounted() {
        get(`${apiurl}/users`)
            .then((users) => {
                state.set({users});
            })
            .catch((e: Error) => console.log(e))
            .then(() => this.usersLoading = false);
    },

    computed: {
        hasNoUsers() {
            if (this.users.length < 1) {
                return true;
            }
            return false;
        }
    },

    methods: {
        openModal(user?: User) {
            if (user) this.setUser(user);
            else this.resetUser();
            this.deleteModal = false;
            this.userModal = true;
        },
        setUser(user: User) {
            this.user.userId = user.userId;
            this.user.name = user.name;
            this.user.email = user.email;
        },
        resetUser() {
            this.user.userId = 0;
            this.user.name = "";
            this.user.email = "";
        },
        deleteUser(user: User) {
            this.setUser(user);
            this.deleteModal = true;
            this.userModal = true;
        }
    }
});
