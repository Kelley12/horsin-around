import { EventEmitter2 } from "eventemitter2";
import { Rider } from "../entity";
import { getManager, Repository } from "typeorm";

export class RiderController {
    private readonly emitter = new EventEmitter2();
    private readonly repository: Repository<Rider>;

    constructor() {
        this.repository = getManager().getRepository(Rider);
    }

    getRiders(): Promise<Rider[]> {
        return this.repository.find();
    }

    getRider(id: number): Promise<Rider | undefined> {
        return this.repository.findOne(id);
    }

    createRider(rider: Rider): Promise<Rider> {
        const newRider = this.repository.create(rider);
        return this.repository.save(newRider);
    }

    async updateRider(rider: Rider, id: number): Promise<Rider | undefined> {
        await this.repository.update(id, rider);
        return this.repository.findOne(id);
    }

    async deleteRider(id: number): Promise<boolean> {
        const deleted = await this.repository.delete(id);
        return deleted.raw[1] ? true : false;
    }

    on(event: "Error", cb: (error: Error) => void): this;
    on(event: string, cb: (...args: any[]) => void): this {
        this.emitter.on(event, cb);
        return this;
    }

    once(event: string, cb: (...args: any[]) => void): this {
        this.emitter.once(event, cb);
        return this;
    }

    onAny(cb: (event: string | string[], ...args: any[]) => void): this {
        this.emitter.onAny(cb);
        return this;
    }
}
