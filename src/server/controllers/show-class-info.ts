import { EventEmitter2 } from "eventemitter2";
import { ShowClassInfo } from "../entity";
import { getManager, Repository } from "typeorm";

export class ShowClassInfoController {
    private readonly emitter = new EventEmitter2();
    private readonly repository: Repository<ShowClassInfo>;

    constructor() {
        this.repository = getManager().getRepository(ShowClassInfo);
    }

    getShowClassInfos(): Promise<ShowClassInfo[]> {
        return this.repository.find();
    }

    getShowClassInfo(id: number): Promise<ShowClassInfo | undefined> {
        return this.repository.findOne(id);
    }

    createShowClassInfo(showClassInfo: ShowClassInfo): Promise<ShowClassInfo> {
        const newShowClassInfo = this.repository.create(showClassInfo);
        return this.repository.save(newShowClassInfo);
    }

    async updateShowClassInfo(showClassInfo: ShowClassInfo, id: number):
        Promise<ShowClassInfo | undefined> {
        await this.repository.update(id, showClassInfo);
        return this.repository.findOne(id);
    }

    async deleteShowClassInfo(id: number): Promise<boolean> {
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
