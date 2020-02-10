export interface IShow {
    name: string;
    showDate: Date;
    awardPlaces: number;
}

export interface Show extends IShow {
    showId: number;
}

export const emptyShow: Show = {
    showId: 0,
    name: "",
    showDate: new Date(),
    awardPlaces: 4
};
