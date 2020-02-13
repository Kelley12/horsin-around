import {
    Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany
} from "typeorm";
import { IRider } from "../../shared";
import { Result } from "./results";

@Entity("riders")
export class Rider implements IRider {
    @PrimaryGeneratedColumn()
    public riderId?: number;

    @Column("varchar", { length: 50 })
    public firstName!: string;

    @Column("varchar", { length: 50 })
    public lastName!: string;

    @OneToMany(_ => Result, result => result.rider)
    public results!: Result[];

    @CreateDateColumn({ type: "datetime" })
    public createDate!: Date;

    @UpdateDateColumn({ type: "datetime" })
    public updateDate!: Date;
}
