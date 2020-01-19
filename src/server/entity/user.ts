import {
    Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { IUser } from "../../shared";

@Entity("users")
export class User implements IUser {
    @PrimaryGeneratedColumn()
    public userId?: number;

    @Column("varchar", { length: 50 })
    public email!: string;

    @Column("varchar", { length: 50 })
    public name!: string;

    @Column("varchar", { length: 60 })
    public passwordHash!: string;

    @CreateDateColumn({ type: "timestamp with time zone" })
    public createDate!: Date;

    @UpdateDateColumn({ type: "timestamp with time zone" })
    public updateDate!: Date;
}
