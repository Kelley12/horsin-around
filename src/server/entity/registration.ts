import {
    Column, Entity, PrimaryGeneratedColumn, ManyToOne,
    CreateDateColumn, JoinColumn
} from "typeorm";
import { IRegistration } from "../../shared";
import { Show } from "./show";
import { ShowClass } from "./show-class";
import { Rider } from "./rider";

@Entity("registration")
export class Registration implements IRegistration {
    @PrimaryGeneratedColumn()
    public registrationId?: number;

    @Column()
    public showId!: number;
    @ManyToOne(_ => Show, show => show.results)
    @JoinColumn({ name: "showId" })
    public show?: Show;

    @Column()
    public showClassId!: number;
    @ManyToOne(_ => ShowClass, showClass => showClass.results)
    @JoinColumn({ name: "showClassId" })
    public showClass?: ShowClass;

    @Column()
    public riderId!: number;
    @ManyToOne(_ => Rider, rider => rider.results)
    @JoinColumn({ name: "riderId" })
    public rider?: Rider;

    @Column("varchar", { length: 50, default: "N/A" })
    public horse!: string;

    @Column("varchar", { length: 50, default: "N/A" })
    public phoneNumber!: string;

    @Column("int", { default: 0 })
    public classFee!: number;

    @Column("boolean", { default: false })
    public schooling!: boolean;

    @CreateDateColumn({ type: "datetime" })
    public createDate!: Date;
}
