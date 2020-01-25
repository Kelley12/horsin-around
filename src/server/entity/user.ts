import {
    Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert
} from "typeorm";
import { IUser } from "../../shared";
import bcrypt from "bcryptjs";

@Entity("users")
export class User implements IUser {
    @PrimaryGeneratedColumn()
    public userId?: number;

    @Column("varchar", { length: 50, unique: true })
    public email!: string;

    @Column("varchar", { length: 50 })
    public name!: string;

    @Column("varchar", { length: 60 })
    public password!: string;

    @CreateDateColumn({ type: "timestamp with time zone" })
    public createDate!: Date;

    @UpdateDateColumn({ type: "timestamp with time zone" })
    public updateDate!: Date;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    validPassowrd(password: string) {
        return bcrypt.compare(password, this.password);
    }
}
