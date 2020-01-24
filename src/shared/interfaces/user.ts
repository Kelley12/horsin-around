export interface IUser {
    email: string;
    name: string;
    passwordHash: string;
}

export interface User {
    userId: number;
    name: string;
    email: string;
}

export const emptyUser: User = {
    userId: 0,
    email: "",
    name: ""
};
