import {
    Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany
} from "typeorm";
import { IClass } from "../../shared";
import { Result } from "./results";
import { ShowClass } from "./show-class";

@Entity("classes")
export class Class implements IClass {
    @PrimaryGeneratedColumn()
    public classId?: number;

    @Column("varchar", { length: 50 })
    public name!: string;

    @Column()
    public speed!: number;

    @OneToMany(_ => Result, result => result.class)
    public results!: Result[];

    @OneToMany(_ => ShowClass, showClass => showClass.class)
    public classes!: ShowClass[];

    @CreateDateColumn({ type: "timestamp with time zone" })
    public createDate!: Date;

    @UpdateDateColumn({ type: "timestamp with time zone" })
    public updateDate!: Date;
}
