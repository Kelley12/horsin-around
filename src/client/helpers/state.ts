import equal from "fast-deep-equal";
import Vue from "vue";
import { EventEmitter2 } from "eventemitter2";

const clone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export class State<T extends object> {
    private readonly emitter = new EventEmitter2();
    private _state: T;

    constructor(initial: T) {
        this._state = initial;
    }

    set(state: Partial<T>) {
        const next = { ...this._state, ...state };
        if (equal(next, this._state)) return;
        const previous = clone(this._state);
        this._state = next;
        this.emitter.emit("Update", clone(this._state), previous);
        this.emitter.emit("Set", clone(state));
    }

    get(): T { return clone(this._state); }

    async when(cb: (state: T) => boolean): Promise<void> {
        return new Promise<void>((res, rej) => {
            this.once("Update", state => {
                if (cb(state)) return res();
                rej(new Error("Unexpected state change"));
            });
        });
    }

    updateVue(vue: Vue) {
        const update = (fields: Partial<T>) => {
            for (const prop in fields) {
                vue.$set(vue.$data, prop, fields[prop]);
            }
        };
        this.on("Update", update);
        vue.$once("hook:destroyed",
            () => this.emitter.removeListener("Update", update));
    }

    /** The state has changed */
    on(event: "Update", cb: (current: T, previous: T) => void): this;
    on(event: "Set", cb: (fields: Partial<T>) => void): this;
    on(event: string, cb: (...args: any[]) => void): this {
        this.emitter.on(event, cb);
        return this;
    }

    /** The state has changed */
    once(event: "Update", cb: (current: T, previous: T) => void): this;
    once(event: "Set", cb: (fields: Partial<T>) => void): this;
    once(event: string, cb: (...args: any[]) => void): this {
        this.emitter.once(event, cb);
        return this;
    }

    /** Remove a listener */
    off(event: string, listener: (...args: any[]) => void) {
        this.emitter.off(event, listener);
    }
}
