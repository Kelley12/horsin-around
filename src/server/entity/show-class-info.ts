import {
    Column, Entity, PrimaryGeneratedColumn, ManyToOne,
    CreateDateColumn, UpdateDateColumn, JoinColumn
} from "typeorm";
import { IShowClassInfo } from "../../shared";
import { Show } from "./show";
import { ShowClass } from "./show-class";

@Entity("showclassinfo")
export class ShowClassInfo implements IShowClassInfo {
    @PrimaryGeneratedColumn()
    public showClassInfoId?: number;

    @Column()
    public showId!: number;
    @ManyToOne(_ => Show, show => show.showClassInfo)
    @JoinColumn({ name: "showId" })
    public show?: Show;

    @Column()
    public showClassId!: number;
    @ManyToOne(_ => ShowClass, showClass => showClass.showClassInfo)
    @JoinColumn({ name: "showClassId" })
    public showClass?: ShowClass;

    @Column("integer", { default: 0 })
    public distance!: number;

    @Column("integer", { default: 0 })
    public speed!: number;

    @Column("integer", { default: 0 })
    public minutes!: number;

    @Column("integer", { default: 0 })
    public seconds!: number;

    @Column("integer", { default: 0 })
    public milliseconds!: number;

    @CreateDateColumn({ type: "timestamp with time zone" })
    public createDate!: Date;

    @UpdateDateColumn({ type: "timestamp with time zone" })
    public updateDate!: Date;
}
