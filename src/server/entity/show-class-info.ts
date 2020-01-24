import {
    Column, Entity, PrimaryGeneratedColumn, ManyToOne,
    CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { IShowClassInfo } from "../../shared";
import { Show } from "./show";
import { ShowClass } from "./show-class";

@Entity("showclassinfo")
export class ShowClassInfo implements IShowClassInfo {
    @PrimaryGeneratedColumn()
    public ShowClassInfoId?: number;

    @ManyToOne(_ => Show, show => show.showClassInfo)
    public show?: Show;

    @ManyToOne(_ => ShowClass, showClass => showClass.showClassInfo)
    public showClass?: ShowClass;

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
