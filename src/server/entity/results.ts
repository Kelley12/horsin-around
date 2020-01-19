import {
    Column, Entity, PrimaryGeneratedColumn, ManyToOne,
    CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { IResults } from "../../shared";
import { Show } from "./show";
import { Class } from "./class";
import { Rider } from "./rider";

@Entity("results")
export class Result implements IResults {
    @PrimaryGeneratedColumn()
    public resultId?: number;

    @ManyToOne(_ => Show, show => show.results)
    public show?: Show;

    @ManyToOne(_ => Class, clas => clas.results)
    public class?: Class;

    @ManyToOne(_ => Rider, rider => rider.results)
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
