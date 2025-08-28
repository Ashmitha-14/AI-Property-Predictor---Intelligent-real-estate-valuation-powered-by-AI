import React from 'react';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { useProperty } from '../contexts/PropertyContext';

const FeatureImportanceChart: React.FC = () => {
  const { featureImportance } = useProperty();

  const maxImpact = Math.max(...featureImportance.map(f => Math.abs(f.impact)));

  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center">
        <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
        Feature Impact Analysis
      </h2>

      <div className="space-y-4">
        {featureImportance.map((feature, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {feature.positive ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {feature.feature}
                </span>
              </div>
              <span className={`text-sm font-bold ${
                feature.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {feature.positive ? '+' : ''}{feature.impact}%
              </span>
            </div>
            
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  feature.positive 
                    ? 'bg-gradient-to-r from-green-400 to-green-600'
                    : 'bg-gradient-to-r from-red-400 to-red-600'
                }`}
                style={{ 
                  width: `${(Math.abs(feature.impact) / maxImpact) * 100}%` 
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
          Key Insights
        </h3>
        <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
          <li>• Positive factors increase your property value</li>
          <li>• Location and size typically have the highest impact</li>
          <li>• Amenities can add significant value in premium areas</li>
        </ul>
      </div>
    </div>
  );
};

export default FeatureImportanceChart;