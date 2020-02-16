export interface IShow {
    name: string;
    showDate: string;
    awardPlaces: number;
}

export interface Show extends IShow {
    showId: number;
}

export const emptyShow: Show = {
    showId: 0,
    name: "",
    showDate: new Date().toDateString(),
    awardPlaces: 4
};
