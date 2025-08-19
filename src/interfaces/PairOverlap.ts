export interface PairOverlap {
    days: number;
    empl1: number;
    empl2: number;
    projects: { projectId: number, days: number}[]; // A Set is used to store unique project IDs automatically.
}