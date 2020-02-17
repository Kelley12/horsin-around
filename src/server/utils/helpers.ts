import { Request, Router } from "express";
import { Result, ShowClassInfo } from "../entity";
import { getRepository } from "typeorm";

type Wrapper = ((router: Router) => void);

export const applyMiddleware = (
    middleware: Wrapper[],
    router: Router
) => {
    for (const apply of middleware) {
        apply(router);
    }
};

export function compareElimination(resultA: Result, resultB: Result) {
    if (resultA.eliminated && !resultB.eliminated) return 1;
    if (!resultA.eliminated && resultB.eliminated) return -1;
    return 0;
}

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

export async function getSortedPlacing(req: Request): Promise<Result[]> {
    let placings: Result[] = [];
        const showId = parseInt(req.params.showId);
        const showClassId = parseInt(req.params.showClassId);

        const resultRepository = getRepository(Result);
        const showClassInfoRepository = getRepository(ShowClassInfo);

        const showClassInfo = await showClassInfoRepository.findOneOrFail({
            where: { showId, showClassId }
        });

        const optimumTime =
            (showClassInfo.minutes * 60000) +
            (showClassInfo.seconds * 1000) +
            (showClassInfo.milliseconds < 10 ? showClassInfo.milliseconds * 100
                : showClassInfo.milliseconds < 100 ? showClassInfo.milliseconds * 10
                : showClassInfo.milliseconds);

        const scoredResults = await resultRepository.find({
            relations: ["rider"],
            join: { alias: "result",
                leftJoinAndSelect: {
                    show: "result.show",
                    rider: "result.rider",
                }
            },
            where: { showId, showClassId, scored: true }
        });

        placings = placings.concat(sortByTimeDiff(scoredResults, optimumTime));

        const schoolingResults = await resultRepository.find({
            relations: ["rider"],
            join: { alias: "result", leftJoinAndSelect: {
                showClass: "result.rider"
            }},
            where: { showId, showClassId, scored: false }
        });

        placings = placings.concat(sortByTimeDiff(schoolingResults, optimumTime));
        return placings;
}
