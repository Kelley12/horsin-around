import { Rider, emptyRider } from "./rider";

export interface IRegistration {
    showId: number;
    showClassId: number;
    riderId: number;
    horse: string;
    phoneNumber: string;
    classFee: number;
    schooling: boolean;
}

export interface Registration extends IRegistration {
    registrationId: number;
    rider?: Rider;
}

export const emptyRegistration: Registration = {
    registrationId: 0,
    showId: 0,
    showClassId: 0,
    riderId: 0,
    horse: "",
    phoneNumber: "",
    classFee: 0,
    schooling: false,
    rider: emptyRider
};
