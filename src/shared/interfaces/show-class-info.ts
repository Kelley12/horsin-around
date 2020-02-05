export interface IShowClassInfo {
    showId: number;
    showClassId: number;
    distance: number;
    speed: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}

export interface ShowClassInfo {
    showClassInfoId: number;
    showId: number;
    showClassId: number;
    distance: number;
    speed: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}

export const emptyShowClassInfo = {
    showClassInfoId: 0,
    showId: 0,
    showClassId: 0,
    distance: 0,
    speed: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
};
