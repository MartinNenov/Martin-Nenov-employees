import React from 'react';
import { FixedSizeList as List } from 'react-window';
import '../styles/pairtable.css';
import type { PairResult } from '../interfaces/PairResult';
import type { PairOverlap, ProjectDays } from '../interfaces/PairOverlap';

const ProjectRow = ({ index, style, data }: { index: number; style: React.CSSProperties; data: ProjectDays[] }) => {
  const project = data[index];
  return (
    <div className="inner-row" style={style}>
      <div className="inner-cell">{project.projectId}</div>
      <div className="inner-cell">{project.days}</div>
    </div>
  );
};

const PairRow = ({ index, style, data }: { index: number; style: React.CSSProperties; data: PairOverlap[] }) => {
  const pair = data[index];
  const projects = pair.projects;

  return (
    <div className="outer-row" style={style}>
      <div className="outer-cell cell-pair">
        {pair.empl1} & {pair.empl2}
      </div>

      <div className="outer-cell cell-days">{pair.days}</div>

      <div className="outer-cell cell-projects">
        <div className="inner-table-container">
          <div className="inner-row header">
            <div className="inner-cell">Project ID</div>
            <div className="inner-cell">Days</div>
          </div>
          <List
            height={100}
            itemCount={projects.length}
            itemSize={30} 
            width="100%"
            itemData={projects}>
            {ProjectRow}
          </List>
        </div>
      </div>
    </div>
  );
};


interface PairResultsDisplayProps {
  result: PairResult;
}

function PairTable({ result }: PairResultsDisplayProps) {
  const sortedPairs = result?.sorted;

  if (!sortedPairs || sortedPairs.length === 0) {
    return <h2>No pair data to display.</h2>;
  }

  return (
    <div className="results-container">
      <h1>Collaboration Analysis</h1>

      <div className="outer-row header">
        <div className="outer-cell cell-pair">Employee Pair</div>
        <div className="outer-cell cell-days">Total Days</div>
        <div className="outer-cell cell-projects project-breakdown">Projects Breakdown</div>
      </div>

      <List
        height={500}
        itemCount={sortedPairs.length}
        itemSize={145}
        width="100%"
        itemData={sortedPairs}
      >
        {PairRow}
      </List>
    </div>
  );
}

export default PairTable;