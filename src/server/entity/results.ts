import {
    Column, Entity, PrimaryGeneratedColumn, ManyToOne,
    CreateDateColumn, UpdateDateColumn, JoinColumn
} from "typeorm";
import { IResults } from "../../shared";
import { Show } from "./show";
import { ShowClass } from "./show-class";
import { Rider } from "./rider";

@Entity("results")
export class Result implements IResults {
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

    @Column("varchar", { length: 50 })
    public horse!: string;

    @Column()
    public scored!: boolean;

    @Column()
    public faults!: number;

    @Column()
    public minutes!: number;

    @Column()
    public seconds!: number;

    @Column()
    public milliseconds!: number;

    @CreateDateColumn({ type: "timestamp with time zone" })
    public createDate!: Date;

    @UpdateDateColumn({ type: "timestamp with time zone" })
    public updateDate!: Date;
}
