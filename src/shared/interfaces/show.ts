export interface IShow {
    name: string;
    showDate: Date;
}

export interface Show {
    showId: number;
    name: string;
    showDate: Date;
}

export const emptyShow: Show = {
    showId: 0,
    name: "",
    showDate: new Date()
};
