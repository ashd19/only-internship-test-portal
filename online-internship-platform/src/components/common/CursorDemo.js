import React, { useState } from 'react';
import CustomCursor from './CustomCursor';
import { downloadMeritListAsCSV, downloadMeritListAsExcel, downloadMeritListAsJSON } from '../../utils/downloadUtils';

const CursorDemo = () => {
  const [downloadStatus, setDownloadStatus] = useState('');

  // Sample merit list data for demo
  const sampleMeritList = [
    { id: 1, name: 'John Doe', email: 'john@example.com', bestScore: 95, percentile: 98, attempts: 1 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', bestScore: 92, percentile: 96, attempts: 2 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', bestScore: 88, percentile: 92, attempts: 1 },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', bestScore: 85, percentile: 89, attempts: 3 },
    { id: 5, name: 'David Brown', email: 'david@example.com', bestScore: 82, percentile: 85, attempts: 1 }
  ];

  const handleDownload = async (format) => {
    setDownloadStatus('Downloading...');
    try {
      let result;
      switch (format) {
        case 'csv':
          result = downloadMeritListAsCSV(sampleMeritList, 'demo-merit-list');
          break;
        case 'excel':
          result = downloadMeritListAsExcel(sampleMeritList, 'demo-merit-list');
          break;
        case 'json':
          result = downloadMeritListAsJSON(sampleMeritList, 'demo-merit-list');
          break;
        default:
          result = downloadMeritListAsCSV(sampleMeritList, 'demo-merit-list');
      }
      
      if (result.success) {
        setDownloadStatus(result.message);
        setTimeout(() => setDownloadStatus(''), 3000);
      } else {
        setDownloadStatus(result.message);
        setTimeout(() => setDownloadStatus(''), 3000);
      }
    } catch (error) {
      setDownloadStatus('Download failed');
      setTimeout(() => setDownloadStatus(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <CustomCursor />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎯 Custom Cursor & Download Demo
          </h1>
          <p className="text-lg text-gray-600">
            Move your cursor around to see the custom cursor movement. Try downloading the sample merit list in different formats.
          </p>
        </div>

        {/* Cursor Movement Demo */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Cursor Movement Demo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
              <h3 className="font-semibold text-blue-800 mb-2">Interactive Element 1</h3>
              <p className="text-blue-600">Hover over this to see cursor effects</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
              <h3 className="font-semibold text-green-800 mb-2">Interactive Element 2</h3>
              <p className="text-green-600">Click to see cursor animation</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
              <h3 className="font-semibold text-purple-800 mb-2">Interactive Element 3</h3>
              <p className="text-purple-600">Move cursor around this area</p>
            </div>
          </div>
        </div>

        {/* Download Demo */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Download Functionality Demo</h2>
          
          {downloadStatus && (
            <div className="mb-4 p-4 bg-blue-100 text-blue-800 rounded-lg">
              {downloadStatus}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => handleDownload('csv')}
              className="flex items-center justify-center p-4 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition-colors"
            >
              <span className="mr-2">📄</span>
              Download as CSV
            </button>
              <button 
              onClick={() => handleDownload('excel')}
              className="flex items-center justify-center p-4 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors"
              >
              <span className="mr-2">📊</span>
              Download as Excel
              </button>
              <button 
              onClick={() => handleDownload('json')}
              className="flex items-center justify-center p-4 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg transition-colors"
              >
              <span className="mr-2">📋</span>
              Download as JSON
              </button>
          </div>

          {/* Sample Merit List Display */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sample Merit List Data</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-4 font-medium text-gray-700">Rank</th>
                    <th className="text-left py-2 px-4 font-medium text-gray-700">Name</th>
                    <th className="text-left py-2 px-4 font-medium text-gray-700">Email</th>
                    <th className="text-left py-2 px-4 font-medium text-gray-700">Score</th>
                    <th className="text-left py-2 px-4 font-medium text-gray-700">Percentile</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleMeritList.map((candidate, index) => (
                    <tr key={candidate.id} className="border-b border-gray-100 hover:bg-blue-50">
                      <td className="py-2 px-4 font-bold text-blue-600">#{index + 1}</td>
                      <td className="py-2 px-4 font-medium">{candidate.name}</td>
                      <td className="py-2 px-4 text-gray-600">{candidate.email}</td>
                      <td className="py-2 px-4 font-medium text-green-600">{candidate.bestScore}%</td>
                      <td className="py-2 px-4 font-bold text-red-600">P{candidate.percentile}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Features Implemented</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🎯 Custom Cursor Movement</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Smooth cursor tracking with visual feedback</li>
                <li>• Cursor trail effect for enhanced visibility</li>
                <li>• Click animations and hover effects</li>
                <li>• Responsive design that works on all screen sizes</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">📥 Download Functionality</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Multiple format support (CSV, Excel, JSON)</li>
                <li>• Automatic file naming with timestamps</li>
                <li>• Progress indicators and success/error messages</li>
                <li>• Direct download to system with proper file extensions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CursorDemo; 