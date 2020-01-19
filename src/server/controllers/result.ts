import { EventEmitter2 } from "eventemitter2";
import { Result } from "../entity";
import { getManager, Repository } from "typeorm";

export class ResultController {
    private readonly emitter = new EventEmitter2();
    private readonly repository: Repository<Result>;

    constructor() {
        this.repository = getManager().getRepository(Result);
    }

    getResults(): Promise<Result[]> {
        return this.repository.find();
    }

    getResult(id: number): Promise<Result | undefined> {
        return this.repository.findOne(id);
    }

    createResult(result: Result): Promise<Result> {
        const newResult = this.repository.create(result);
        return this.repository.save(newResult);
    }

    async updateResult(result: Result, id: number): Promise<Result | undefined> {
        await this.repository.update(id, result);
        return this.repository.findOne(id);
    }

    async deleteResult(id: number): Promise<boolean> {
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
