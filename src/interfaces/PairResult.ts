import type { PairOverlap } from "./PairOverlap";

export interface PairResult {
    topPair: {
        pair: [number, number];
        days: number;
        projects: { projectId: number, days: number}[];
    },
    sorted: PairOverlap[]
}