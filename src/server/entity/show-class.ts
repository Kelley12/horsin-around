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

    @OneToMany(_ => Result, result => result.showClass)
    public results!: Result[];

    @OneToMany(_ => ShowClassInfo, ShowClassInfo => ShowClassInfo.showClass)
    public showClassInfo!: ShowClassInfo[];

    @CreateDateColumn({ type: "datetime" })
    public createDate!: Date;

    @UpdateDateColumn({ type: "datetime" })
    public updateDate!: Date;
}
