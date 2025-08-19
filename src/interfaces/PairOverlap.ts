export interface ProjectDays {
    projectId: number, 
    days: number
}

export interface PairOverlap {
    days: number;
    empl1: number;
    empl2: number;
    projects: ProjectDays[];
}