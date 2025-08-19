import type { PairOverlap, ProjectDays } from "./PairOverlap";

export interface PairResult {
    topPair: {
        pair: [number, number];
        days: number;
        projects: ProjectDays[];
    },
    sorted: PairOverlap[]
}