const fetch = require("node-fetch");
import { Headers, Request } from "node-fetch";

const parseResponse = (res: Response): Promise<string | any> => {
    const type = res.headers.get("content-type");
    if (type && type.includes("application/json")) {
        return res.json();
    }

    return res.text();
};

const statusRej = async (res: Response) => {
    const result = await parseResponse(res);
    if (typeof result === "string") {
        throw new Error(result);
    }

    throw new Error(result.error);
};

const jsonHeader = new Headers();
jsonHeader.append("Content-Type", "application/json");

const baseHeader = new Headers();

export function setAjaxToken(token: string) {
    baseHeader.set("horsin-around-token", token);
    jsonHeader.set("horsin-around-token", token);
}

export async function get(uri: string): Promise<any> {
    const req = new Request(uri, { headers: baseHeader });
    const res = await fetch(req);
    if (res.status !== 200) return statusRej(res);
    return parseResponse(res);
}

export async function put(uri: string, body: any): Promise<void> {
    const req = new Request(uri, {
        method: "PUT", body: JSON.stringify(body), headers: jsonHeader
    });
    const res = await fetch(req);
    if (res.status !== 200) return statusRej(res);
    return parseResponse(res);
}

export async function patch(uri: string, body: any): Promise<void> {
    const req = new Request(uri, {
        method: "PATCH", body: JSON.stringify(body), headers: jsonHeader
    });
    const res = await fetch(req);
    if (res.status !== 200) return statusRej(res);
    return parseResponse(res);
}

export async function del(uri: string): Promise<void> {
    const req = new Request(uri, { method: "DELETE", headers: baseHeader });
    const res = await fetch(req);
    if (res.status !== 204) return statusRej(res);
    return parseResponse(res);
}

export async function post<T = any>(uri: string, body?: any): Promise<T> {
    const req = new Request(uri, {
        method: "POST", body: JSON.stringify(body), headers: jsonHeader
    });
    const res = await fetch(req);
    if (res.status !== 201) return statusRej(res);
    return parseResponse(res);
}
