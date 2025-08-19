import { useState } from 'react'
import Dropzone from './components/Dropzone';
import DataTable from './components/DataTable';
import PairTable from './components/PairTable';
import './App.css'
import { type CsvData } from './interfaces/CsvData';
import { findLongestWorkingPair } from './services/employeeAnalyzer';
import type { PairResult } from './interfaces/PairResult';

function App() {

  const [csvData, setCsvData] = useState<CsvData[]>([]);
  const [analysisResult, setAnalysisResult] = useState<PairResult | null>(null);

  const handleDataLoaded = (data: CsvData[]) => {
    const result = findLongestWorkingPair(data);
    setCsvData(data);
    setAnalysisResult(result);
  };

  return (
    <div className='application'>
      <header className="App-header">
        <h1>CSV Employee Data Analyzer</h1>
        <p>Upload a CSV file to find the pair of employees who worked together the longest.</p>
      </header>
      <main>
        <Dropzone onDataLoaded={handleDataLoaded} />
        {analysisResult && <PairTable result={analysisResult} />}
        <DataTable data={csvData} />
      </main>
    </div>
  )
}

export default App
