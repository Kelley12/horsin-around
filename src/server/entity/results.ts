import {
    Column, Entity, PrimaryGeneratedColumn, ManyToOne,
    CreateDateColumn, UpdateDateColumn, JoinColumn
} from "typeorm";
import { IResult, PaymentType } from "../../shared";
import { Show } from "./show";
import { ShowClass } from "./show-class";
import { Rider } from "./rider";

@Entity("results")
export class Result implements IResult {
    @PrimaryGeneratedColumn()
    public resultId?: number;

    @Column()
    public showId!: number;
    @ManyToOne(_ => Show, show => show.results)
    @JoinColumn({ name: "showId" })
    public show?: Show;

    @Column()
    public showClassId!: number;
    @ManyToOne(_ => ShowClass, showClass => showClass.results)
    @JoinColumn({ name: "showClassId" })
    public showClass?: ShowClass;

    @Column()
    public riderId!: number;
    @ManyToOne(_ => Rider, rider => rider.results)
    @JoinColumn({ name: "riderId" })
    public rider?: Rider;

    @Column("integer", { default: 0 })
    public riderNumber!: number;

    @Column("varchar", { length: 50, default: "N/A" })
    public horse!: string;

    @Column("boolean", { default: false })
    public scored!: boolean;

    @Column("integer", { default: 0 })
    public faults!: number;

    @Column("integer", { default: 0 })
    public timePenalty!: number;

    @Column("integer", { default: 0 })
    public minutes!: number;

    @Column("integer", { default: 0 })
    public seconds!: number;

    @Column("integer", { default: 0 })
    public milliseconds!: number;

    @Column("integer", { default: 0 })
    public timeInMs!: number;

    @Column("boolean", { default: false })
    public eliminated!: boolean;

    @Column("boolean", { default: false })
    public paid!: boolean;

    @Column("varchar", { length: 50, default: "cash" })
    public paymentType!: PaymentType;

    @CreateDateColumn({ type: "datetime" })
    public createDate!: Date;

    @UpdateDateColumn({ type: "datetime" })
    public updateDate!: Date;
}
