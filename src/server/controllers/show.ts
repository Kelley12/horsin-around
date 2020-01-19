import { EventEmitter2 } from "eventemitter2";
import { Show } from "../entity";
import { getManager, Repository } from "typeorm";

export class ShowController {
    private readonly emitter = new EventEmitter2();
    private readonly repository: Repository<Show>;

    constructor() {
        this.repository = getManager().getRepository(Show);
    }

    getShows(): Promise<Show[]> {
        return this.repository.find();
    }

    getShow(id: number): Promise<Show | undefined> {
        return this.repository.findOne(id);
    }

    createShow(show: Show): Promise<Show> {
        const newShow = this.repository.create(show);
        return this.repository.save(newShow);
    }

    async updateShow(show: Show, id: number): Promise<Show | undefined> {
        await this.repository.update(id, show);
        return this.repository.findOne(id);
    }

    async deleteShow(id: number): Promise<boolean> {
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
