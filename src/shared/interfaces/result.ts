import { Rider, emptyRider } from "./rider";

export interface IResult {
    showId: number;
    showClassId: number;
    riderId: number;
    riderNumber: number;
    horse: string;
    scored: boolean;
    faults: number;
    timePenalty: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
    eliminated: boolean;
}

export interface Result extends IResult {
    resultId: number;
    rider?: Rider;
}

export const emptyResult: Result = {
    resultId: 0,
    showId: 0,
    showClassId: 0,
    riderId: 0,
    riderNumber: 0,
    horse: "",
    scored: false,
    faults: 0,
    timePenalty: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    eliminated: false,
    rider: emptyRider
};
