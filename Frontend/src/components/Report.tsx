import React, { useState } from 'react';
import { Calendar, Download, FileSpreadsheet } from 'lucide-react';

const Report: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  
  const handleGenerateReport = () => {
    if (!startDate || !endDate) return;
    
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      
      // Reset the "generated" state after a few seconds
      setTimeout(() => {
        setIsGenerated(false);
      }, 3000);
    }, 2000);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  return (
    <div className="p-6 h-full">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Generate Reports</h1>
        
        <div className="bg-slate-800 rounded-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-6">Select Date Range</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Start Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 pr-10"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <Calendar className="absolute right-3 top-3 h-5 w-5 text-slate-400" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">End Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 pr-10"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                    <Calendar className="absolute right-3 top-3 h-5 w-5 text-slate-400" />
                  </div>
                </div>
                
                <button
                  className={`w-full py-3 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    !startDate || !endDate
                      ? 'bg-slate-600 cursor-not-allowed'
                      : isGenerating
                      ? 'bg-cyan-700'
                      : isGenerated
                      ? 'bg-green-600'
                      : 'bg-cyan-600 hover:bg-cyan-700'
                  }`}
                  onClick={handleGenerateReport}
                  disabled={!startDate || !endDate || isGenerating}
                >
                  {isGenerating ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Generating...
                    </div>
                  ) : isGenerated ? (
                    <>
                      <Download className="h-5 w-5 mr-2" />
                      Report Downloaded
                    </>
                  ) : (
                    <>
                      <FileSpreadsheet className="h-5 w-5 mr-2" />
                      Generate Report
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Report Summary</h3>
              
              {!startDate || !endDate ? (
                <div className="text-slate-400 text-center py-8">
                  Select a date range to see the report summary
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-400">Date Range</p>
                    <p className="font-medium">
                      {formatDate(startDate)} - {formatDate(endDate)}
                    </p>
                  </div>
                  
                  <div className="border-t border-slate-600 pt-4">
                    <p className="text-sm text-slate-400">Report Contents</p>
                    <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                      <li>Detection events summary</li>
                      <li>Threat classification breakdown</li>
                      <li>Response time analytics</li>
                      <li>System performance metrics</li>
                      <li>Alert history and outcomes</li>
                    </ul>
                  </div>
                  
                  <div className="border-t border-slate-600 pt-4">
                    <p className="text-sm text-slate-400">File Format</p>
                    <p className="font-medium">Microsoft Excel (.xlsx)</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Available Report Types</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-700 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Detection Summary</h3>
              <p className="text-sm text-slate-400">
                Overview of all detection events with timestamps and classifications.
              </p>
            </div>
            
            <div className="bg-slate-700 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Threat Analysis</h3>
              <p className="text-sm text-slate-400">
                Detailed analysis of detected threats with risk assessment scores.
              </p>
            </div>
            
            <div className="bg-slate-700 p-4 rounded-lg">
              <h3 className="font-medium mb-2">System Performance</h3>
              <p className="text-sm text-slate-400">
                Metrics on system uptime, detection accuracy, and response times.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;