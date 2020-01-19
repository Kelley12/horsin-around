import {
    Column, Entity, PrimaryGeneratedColumn, ManyToOne,
    CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { IShowClass } from "../definitions";
import { Show } from "./show";
import { Class } from "./class";

@Entity("showclasses")
export class ShowClass implements IShowClass {
    @PrimaryGeneratedColumn()
    public showClassId?: number;

    @ManyToOne(_ => Show, show => show.classes)
    public show?: Show;

    @ManyToOne(_ => Class, clas => clas.classes)
    public class?: Class;

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
