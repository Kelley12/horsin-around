import { PaymentType, ShowClass } from ".";
import { IRider, Rider } from "./rider";

export interface Entry extends Rider {
    showId: number;
    horse: string;
    riderNumber: number;
    classes: ShowClass[];
    attributes: any;
    paid: boolean;
    paymentType: PaymentType;
}

export interface IEntry extends IRider {
    riderNumber: number;
    horse: string;
    classes: ShowClass[];
    paid: boolean;
    paymentType: PaymentType;
}
