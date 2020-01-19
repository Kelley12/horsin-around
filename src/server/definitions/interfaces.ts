export interface IRider {
    firstName: string;
    lastName: string;
}

export interface IShow {
    name: string;
    showDate: Date;
    distance: number;
}

export interface IClass {
    name: string;
    speed: number;
}

export interface IShowClass {
    minutes: number;
    seconds: number;
    milliseconds: number;
}

export interface IResults {
    horse: string;
    scored: boolean;
    faults: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}
