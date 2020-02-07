export interface IResult {
    showId: number;
    showClassId: number;
    riderId: number;
    horse: string;
    scored: boolean;
    faults: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}

export interface Result extends IResult {
    resultId: number;
}

export const emptyResult: Result = {
    resultId: 0,
    showId: 0,
    showClassId: 0,
    riderId: 0,
    horse: "",
    scored: false,
    faults: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
};
