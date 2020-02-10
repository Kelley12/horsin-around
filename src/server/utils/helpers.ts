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

      const x = Math.abs(a.timeInMs - optimumTime) + (a.faults * 1000) + (a.timePenalty * 1000);
      const y = Math.abs(b.timeInMs - optimumTime) + (b.faults * 1000) + (b.timePenalty * 1000);

      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

export function compareElimination(resultA: Result, resultB: Result) {
  if (resultA.eliminated && !resultB.eliminated) return 1;
  if (!resultA.eliminated && resultB.eliminated) return -1;
  return 0;
}
