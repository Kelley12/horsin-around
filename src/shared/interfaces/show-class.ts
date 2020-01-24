export interface ShowClass {
    showClassId: number;
    name: string;
    speed: number;
}

export interface IShowClass {
    name: string;
    speed: number;
}

export const emptyShowClass: ShowClass = {
    showClassId: 0,
    name: "",
    speed: 0
};
