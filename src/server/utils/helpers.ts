import { Request, Router } from "express";
import { Result, Rider, ShowClassInfo } from "../entity";
import { getRepository } from "typeorm";
import { logger } from '.';

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


export async function getOrCreateRider(firstName: string, lastName: string): Promise<number> {
    // Lookup the rider by first and last name
    // If they exists, get the rider Id, otherwise create a new rider
    const riderRepository = getRepository(Rider);
    let rider = await riderRepository.find({
        where: { firstName, lastName }
    });

    let riderId = 0;
    if (!rider || !rider[0]) {
        // Rider does not exist, create rider
        const newRider = new Rider();
        newRider.firstName = firstName;
        newRider.lastName = lastName;

        logger.log("info", `Rider not found, creating new rider: ${firstName} ${lastName}`);
        const riders = await riderRepository.save(newRider);

        // Find the rider if they have been created
        rider = [riders];
    }

    if (rider && rider[0] && rider[0].riderId) {
        // Rider exists, get riderId
        riderId = rider[0].riderId;
    } else {
        throw Error("Error saving rider");
    }

    return riderId;
}

export function validateEntries(entries: any): any {
    if (!entries || entries.length < 1) {
        throw Error("Missing data: entries");
    }

    const {
        showId,
        showClassId,
        firstName,
        lastName,
    } = entries[0];

    if (!showId || !showClassId || !firstName || !lastName) {
        throw Error("Missing data: show, class, or rider");
    }
}

