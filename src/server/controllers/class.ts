import { EventEmitter2 } from "eventemitter2";
import { Class } from "../entity";
import { getManager, Repository } from "typeorm";

export class ClassController {
    private readonly emitter = new EventEmitter2();
    private readonly repository: Repository<Class>;

    constructor() {
        this.repository = getManager().getRepository(Class);
    }

    getClasss(): Promise<Class[]> {
        return this.repository.find();
    }

    getClass(id: number): Promise<Class | undefined> {
        return this.repository.findOne(id);
    }

    createClass(classModel: Class): Promise<Class> {
        const newClass = this.repository.create(classModel);
        return this.repository.save(newClass);
    }

    async updateClass(classModel: Class, id: number): Promise<Class | undefined> {
        await this.repository.update(id, classModel);
        return this.repository.findOne(id);
    }

    async deleteClass(id: number): Promise<boolean> {
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
