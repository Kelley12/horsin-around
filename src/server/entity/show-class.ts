import {
    Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany
} from "typeorm";
import { IShowClass } from "../../shared";
import { Result } from "./results";
import { ShowClassInfo } from "./show-class-info";

@Entity("showclasses")
export class ShowClass implements IShowClass {
    @PrimaryGeneratedColumn()
    public showClassId?: number;

    @Column("varchar", { length: 50 })
    public name!: string;

    @Column()
    public speed!: number;

    @OneToMany(_ => Result, result => result.showClass)
    public results!: Result[];

    @OneToMany(_ => ShowClassInfo, ShowClassInfo => ShowClassInfo.showClass)
    public showClassInfo!: ShowClassInfo[];

    @CreateDateColumn({ type: "timestamp with time zone" })
    public createDate!: Date;

    @UpdateDateColumn({ type: "timestamp with time zone" })
    public updateDate!: Date;
}
