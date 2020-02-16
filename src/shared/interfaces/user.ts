export interface IUser {
    email: string;
    name: string;
    password: string;
    role: string;
}

export interface User {
    userId: number;
    name: string;
    email: string;
    role: string;
}

export const emptyUser: User = {
    userId: 0,
    email: "",
    name: "",
    role: "user"
};
