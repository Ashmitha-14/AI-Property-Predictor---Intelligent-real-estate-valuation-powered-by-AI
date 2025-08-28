import React from 'react';
import { TrendingUp, Target, AlertCircle } from 'lucide-react';
import { useProperty } from '../contexts/PropertyContext';

const PredictionDisplay: React.FC = () => {
  const { predictedPrice, confidence } = useProperty();

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const getConfidenceColor = (conf: number) => {
    if (conf >= 90) return 'text-green-600 dark:text-green-400';
    if (conf >= 80) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getConfidenceBackground = (conf: number) => {
    if (conf >= 90) return 'bg-green-100 dark:bg-green-900';
    if (conf >= 80) return 'bg-yellow-100 dark:bg-yellow-900';
    return 'bg-red-100 dark:bg-red-900';
  };

  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center">
        <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
        Price Prediction
      </h2>

      <div className="text-center space-y-6">
        {/* Main Price Display */}
        <div className="relative">
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
            {formatPrice(predictedPrice)}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Estimated Market Value
          </div>
        </div>

        {/* Confidence Score */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center">
              <Target className="h-4 w-4 mr-1" />
              Confidence Score
            </span>
            <span className={`text-sm font-bold ${getConfidenceColor(confidence)}`}>
              {confidence.toFixed(1)}%
            </span>
          </div>
          
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                confidence >= 90 
                  ? 'bg-gradient-to-r from-green-400 to-green-600' 
                  : confidence >= 80 
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                  : 'bg-gradient-to-r from-red-400 to-red-600'
              }`}
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>

        {/* Confidence Interpretation */}
        <div className={`p-3 rounded-lg ${getConfidenceBackground(confidence)}`}>
          <div className="flex items-center justify-center space-x-2">
            <AlertCircle className={`h-4 w-4 ${getConfidenceColor(confidence)}`} />
            <span className={`text-sm font-medium ${getConfidenceColor(confidence)}`}>
              {confidence >= 90 
                ? 'High Confidence - Reliable Prediction'
                : confidence >= 80 
                ? 'Medium Confidence - Good Estimate'
                : 'Lower Confidence - Use with Caution'
              }
            </span>
          </div>
        </div>

        {/* Price Range */}
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Expected Price Range
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              Low: {formatPrice(predictedPrice * 0.9)}
            </span>
            <span className="text-slate-600 dark:text-slate-400">
              High: {formatPrice(predictedPrice * 1.1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionDisplay;