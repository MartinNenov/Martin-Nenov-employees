import React from 'react';
import { FixedSizeList as List } from 'react-window';
import '../styles/datatable.css';
import { type CsvData } from '../interfaces/CsvData';
import { format } from 'date-fns';

interface DataTableProps {
    data: CsvData[];
}

const formatDate = (date: Date) => {
    return format(date, 'MMM d, yyyy'); 
}

const Row = ({ index, style, data }: { index: number, style: React.CSSProperties, data: CsvData[] }) => {
    const rowData = data[index];
    return (
        <div className="data-row" style={style}>
            <div className="row-cell">{rowData.EmpID}</div>
            <div className="row-cell">{rowData.ProjectID}</div>
            <div className="row-cell">{formatDate(rowData.DateFrom)}</div>
            <div className="row-cell">{formatDate(rowData.DateTo)}</div>
        </div>
    );
};

function DataTable({ data }: DataTableProps) {
    if (!data.length) {
        return null; 
    }

    return (
        <div className="table-container">
            <div className="data-row header">
                <div className="row-cell">Employee ID</div>
                <div className="row-cell">Project ID</div>
                <div className="row-cell">Date From</div>
                <div className="row-cell">Date To</div>
            </div>

            <List
                height={400} 
                itemCount={data.length}
                itemSize={35} 
                width="100%"
                itemData={data}
            >
                {Row}
            </List>
        </div>
    );
}

export default DataTable;