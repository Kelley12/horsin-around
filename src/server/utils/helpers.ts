import { Router } from "express";
import { Result } from "../entity";

type Wrapper = ((router: Router) => void);

export const applyMiddleware = (
    middleware: Wrapper[],
    router: Router
) => {
    for (const apply of middleware) {
        apply(router);
    }
};

export function sortByTimeDiff(array: Result[], optimumTime: number) {
    return array.sort((a, b) => {
        const elimination = compareElimination(a, b);
        if (elimination !== 0) return elimination;

        const x = Math.abs(a.timeInMs - optimumTime) + // Time Diff
            Math.max(0, a.timeInMs - optimumTime) + // Penalty for over opt time
            (a.faults * 1000) + // Fault penalty
            (a.timePenalty * 1000); // Additional time penalty

        const y = Math.abs(b.timeInMs - optimumTime) + // Time Diff
            Math.max(0, b.timeInMs - optimumTime) + // Penalty for over opt time
            (b.faults * 1000) + // Fault penalty
            (b.timePenalty * 1000); // Additional time penalty

        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

export function compareElimination(resultA: Result, resultB: Result) {
    if (resultA.eliminated && !resultB.eliminated) return 1;
    if (!resultA.eliminated && resultB.eliminated) return -1;
    return 0;
}
