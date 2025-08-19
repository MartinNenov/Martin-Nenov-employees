import type { CsvData } from "../interfaces/CsvData";
import type { PairOverlap } from "../interfaces/PairOverlap";
import type { PairResult } from "../interfaces/PairResult";


export function findLongestWorkingPair(data: CsvData[]): PairResult | null {
    if (data.length < 2) {
        return null;
    }

    const projectMap = data.reduce<{ [projectID: number]: CsvData[] }>((acc, record) => {
        if (!acc[record.ProjectID]) {
            acc[record.ProjectID] = [];
        }
        acc[record.ProjectID].push(record);
        return acc;
    }, {});

    const pairMap: { [pairKey: string]: PairOverlap } = {};

    for (const projectID in projectMap) {
        const employeesOnProject = projectMap[projectID];

        if (employeesOnProject.length > 1) {
            for (let i = 0; i < employeesOnProject.length; i++) {
                for (let j = i + 1; j < employeesOnProject.length; j++) {
                    const emp1 = employeesOnProject[i];
                    const emp2 = employeesOnProject[j];
                    if (emp1.EmpID === emp2.EmpID) continue;

                    const latestStartDate = Math.max(emp1.DateFrom.getTime(), emp2.DateFrom.getTime());
                    const earliestEndDate = Math.min(emp1.DateTo.getTime(), emp2.DateTo.getTime());

                    if (latestStartDate < earliestEndDate) {
                        const overlapDuration = earliestEndDate - latestStartDate;
                        const overlapDays = Math.ceil(overlapDuration / (1000 * 60 * 60 * 24));

                        const pairKey = [emp1.EmpID, emp2.EmpID].sort().join('-');

                        if (!pairMap[pairKey]) {
                            pairMap[pairKey] = { days: 0, projects: [], empl1: emp1.EmpID, empl2: emp2.EmpID };
                        }

                        pairMap[pairKey].days += overlapDays;
                        pairMap[pairKey].projects.push({ projectId: emp1.ProjectID, days: overlapDays });
                    }
                }
            }
        }
    }

    let maxDays = 0;
    let longestPairKey: string | null = null;

    let pairsWorkArray: PairOverlap[] = []

    for (const pairKey in pairMap) {
        pairsWorkArray.push(pairMap[pairKey]);
        if (pairMap[pairKey].days > maxDays) {
            maxDays = pairMap[pairKey].days;
            longestPairKey = pairKey;
        }
    }

    pairsWorkArray.sort((a, b) => b.days - a.days);

    if (longestPairKey) {
        const topPairData = pairMap[longestPairKey];
        return {
            topPair: {
                pair: longestPairKey.split('-').map(Number) as [number, number],
                days: topPairData.days,
                projects: topPairData.projects,
            }, 
            sorted: pairsWorkArray
        }
    }

    return null;
}