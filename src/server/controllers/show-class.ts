import { EventEmitter2 } from "eventemitter2";
import { ShowClass } from "../entity";
import { getManager, Repository } from "typeorm";

export class ShowClassController {
    private readonly emitter = new EventEmitter2();
    private readonly repository: Repository<ShowClass>;

    constructor() {
        this.repository = getManager().getRepository(ShowClass);
    }

    getShowClasss(): Promise<ShowClass[]> {
        return this.repository.find();
    }

    getShowClass(id: number): Promise<ShowClass | undefined> {
        return this.repository.findOne(id);
    }

    createShowClass(showclass: ShowClass): Promise<ShowClass> {
        const newShowClass = this.repository.create(showclass);
        return this.repository.save(newShowClass);
    }

    async updateShowClass(showclass: ShowClass, id: number): Promise<ShowClass | undefined> {
        await this.repository.update(id, showclass);
        return this.repository.findOne(id);
    }

    async deleteShowClass(id: number): Promise<boolean> {
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
