import { useState } from 'react'
import Dropzone from './components/Dropzone';
import DataTable from './components/DataTable';
import './App.css'
import { type CsvData } from './interfaces/CsvData';

function App() {

  const [csvData, setCsvData] = useState<CsvData[]>([]);

  const handleDataLoaded = (data: CsvData[]) => {
    setCsvData(data);
  };

  return (
    <div className='application'>
      <header className="App-header">
        <h1>CSV Employee Data Analyzer</h1>
        <p>Upload a CSV file to find the pair of employees who worked together the longest.</p>
      </header>
      <main>
        <Dropzone onDataLoaded={handleDataLoaded} />
        <DataTable data={csvData} />
      </main>
    </div>
  )
}

export default App
