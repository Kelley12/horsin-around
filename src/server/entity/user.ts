import {
    Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, Index
} from "typeorm";
import { IUser } from "../../shared";
import bcrypt from "bcryptjs";
import { Length, IsEmail } from "class-validator";

@Entity("users")
@Unique(["email"])
export class User implements IUser {
    @PrimaryGeneratedColumn()
    public userId?: number;

    @Column("varchar", { length: 50 })
    @Index("email")
    @IsEmail()
    public email!: string;

    @Column("varchar", { length: 50 })
    public name!: string;

    @Column("varchar", { length: 60 })
    @Length(8, 60)
    public password!: string;

    @Column("varchar", { default: "user" })
    public role!: string;

    @CreateDateColumn({ type: "datetime" })
    public createDate!: Date;

    @UpdateDateColumn({ type: "datetime" })
    public updateDate!: Date;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    validPassowrd(password: string) {
        return bcrypt.compareSync(password, this.password);
    }
}
