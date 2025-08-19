import { useCallback } from 'react';
import { useDropzone, type Accept } from 'react-dropzone';
import Papa from 'papaparse';
import "../styles/dropzone.css";
import { type CsvData } from '../interfaces/CsvData';

interface DropzoneProps {
    onDataLoaded: (data: CsvData[]) => void;
}

function Dropzone({ onDataLoaded }: DropzoneProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (!acceptedFiles.length) return;
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onabort = () => console.log('File reading was aborted');
        reader.onerror = () => console.log('File reading has failed');
        reader.onload = () => {
            const csvText = reader.result as string;
            const expectedHeaders = ['EmpID', 'ProjectID', 'DateFrom', 'DateTo'];

            Papa.parse(csvText, {
                skipEmptyLines: true,
                complete: (results) => {
                    const allRows = results.data as string[][];
                    if (allRows.length === 0) {
                        alert('The CSV file is empty.');
                        return;
                    }

                    let firstRow = allRows[0];
                    let dataRows: string[][] = allRows;

                    while(isNaN(+firstRow[0])) {
                        firstRow = dataRows[0];
                        dataRows = dataRows.slice(1);
                    }

                    const formattedData: CsvData[] = dataRows.map(row => {
                        const obj: any = { EmpID: '', ProjectID: '', DateFrom: undefined, DateTo: undefined };
                        expectedHeaders.forEach((header, index) => {
                            // @ts-ignore
                            obj[header] = row[index] || null;
                        });
                        obj.EmpID = +obj.EmpID;
                        obj.ProjectID = +obj.ProjectID;
                        obj.DateFrom = new Date(obj.DateFrom);
                        obj.DateTo = (obj.DateTo && obj.DateTo !== "NULL") ? new Date(obj.DateTo) : new Date();
                        return obj;
                    });

                    const validData = formattedData.filter(row => row.EmpID);
                    onDataLoaded(validData);
                },
                error: (error: any) => {
                    console.error('Error parsing CSV:', error);
                    alert('An error occurred while parsing the CSV file.');
                }
            });
        };

        reader.readAsText(file);
    }, [onDataLoaded])

    const accept: Accept = {
        'text/csv': ['.csv'],
    };

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept,
        maxFiles: 1,
    })

    return (
        <div className='dropzone-container' {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragReject && <p className="drop-reject">Only .csv files are accepted</p>}
            {!isDragActive && !isDragReject && <p>Drag 'n' drop a CSV file here, or click to select</p>}
            {isDragActive && !isDragReject && <p>Drop the file here ...</p>}
        </div>
    );
}

export default Dropzone;