export interface Rider {
    riderId: number;
    firstName: string;
    lastName: string;
}

export interface IRider {
    firstName: string;
    lastName: string;
}

export const emptyRider: Rider = {
    riderId: 0,
    firstName: "",
    lastName: ""
};
