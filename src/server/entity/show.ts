import {
    Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany
} from "typeorm";
import { IShow } from "../../shared";
import { Result } from "./results";
import { ShowClass } from "./show-class";

@Entity("shows")
export class Show implements IShow {
    @PrimaryGeneratedColumn()
    public showId?: number;

    @Column("varchar", { length: 50 })
    public name!: string;

    @Column("date")
    public showDate!: Date;

    @Column()
    public distance!: number;

    @OneToMany(_ => Result, result => result.show)
    public results!: Result[];

    @OneToMany(_ => ShowClass, showClass => showClass.show)
    public classes!: ShowClass[];

    @CreateDateColumn({ type: "timestamp with time zone" })
    public createDate!: Date;

    @UpdateDateColumn({ type: "timestamp with time zone" })
    public updateDate!: Date;
}
