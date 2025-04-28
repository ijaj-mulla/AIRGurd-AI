import React from 'react';
import { LineChart, BarChart, PieChart } from 'lucide-react';

const Insights: React.FC = () => {
  return (
    <div className="p-6 h-full">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Insights</h1>
        
        <div className="bg-slate-800 rounded-lg p-8 mb-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <LineChart className="h-16 w-16 text-slate-500" />
              </div>
              <h2 className="text-xl font-medium mb-2">Insights Coming Soon</h2>
              <p className="text-slate-400 max-w-md">
                This section will provide advanced analytics and insights about detected airborne threats and patterns.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-6 rounded-lg">
            <div className="flex justify-center mb-4">
              <LineChart className="h-10 w-10 text-cyan-500" />
            </div>
            <h3 className="text-lg font-medium text-center mb-2">Trend Analysis</h3>
            <p className="text-slate-400 text-center">
              Visualize detection trends over time to identify patterns and improve security protocols.
            </p>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-lg">
            <div className="flex justify-center mb-4">
              <BarChart className="h-10 w-10 text-cyan-500" />
            </div>
            <h3 className="text-lg font-medium text-center mb-2">Threat Classification</h3>
            <p className="text-slate-400 text-center">
              Breakdown of detected objects by type, size, and potential threat level.
            </p>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-lg">
            <div className="flex justify-center mb-4">
              <PieChart className="h-10 w-10 text-cyan-500" />
            </div>
            <h3 className="text-lg font-medium text-center mb-2">Coverage Analysis</h3>
            <p className="text-slate-400 text-center">
              Evaluate detection coverage and identify potential blind spots in your security perimeter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;