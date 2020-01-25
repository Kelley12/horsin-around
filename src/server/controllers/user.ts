import { EventEmitter2 } from "eventemitter2";
import { User } from "../entity";
import { getManager, Repository } from "typeorm";
const generator = require("generate-password");

export class UserController {
    private readonly emitter = new EventEmitter2();
    private readonly repository: Repository<User>;

    constructor() {
        this.repository = getManager().getRepository(User);
    }

    getUsers(): Promise<User[]> {
        return this.repository.find();
    }

    getUser(id: number): Promise<User | undefined> {
        return this.repository.findOne(id);
    }

    createUser(user: User): Promise<User> {
        if (!user.password) {
            user.password = generator.generate({
                length: 15, numbers: true, symbols: true
            });
        }
        const newUser = this.repository.create(user);
        return this.repository.save(newUser);
    }

    async updateUser(user: User, id: number): Promise<User | undefined> {
        await this.repository.update(id, user);
        return this.repository.findOne(id);
    }

    async deleteUser(id: number): Promise<boolean> {
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
