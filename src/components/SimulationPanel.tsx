import React, { useState } from 'react';
import { Sliders, Play, RotateCcw } from 'lucide-react';
import { useProperty } from '../contexts/PropertyContext';

const SimulationPanel: React.FC = () => {
  const { propertyData, updateProperty, predictedPrice } = useProperty();
  const [originalData, setOriginalData] = useState(propertyData);
  const [isSimulating, setIsSimulating] = useState(false);

  const startSimulation = () => {
    setOriginalData(propertyData);
    setIsSimulating(true);
  };

  const resetSimulation = () => {
    Object.entries(originalData).forEach(([key, value]) => {
      updateProperty(key as keyof typeof propertyData, value);
    });
    setIsSimulating(false);
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const quickSimulations = [
    {
      name: 'Add Pool',
      action: () => updateProperty('amenities', { ...propertyData.amenities, pool: true }),
      active: propertyData.amenities.pool,
    },
    {
      name: 'Add Garage',
      action: () => updateProperty('amenities', { ...propertyData.amenities, garage: true }),
      active: propertyData.amenities.garage,
    },
    {
      name: '+500 sq ft',
      action: () => updateProperty('squareFootage', propertyData.squareFootage + 500),
      active: false,
    },
    {
      name: '+1 Bedroom',
      action: () => updateProperty('bedrooms', propertyData.bedrooms + 1),
      active: false,
    },
  ];

  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center">
        <Sliders className="h-5 w-5 mr-2 text-purple-600" />
        Live Simulation
      </h2>

      <div className="space-y-6">
        {/* Simulation Controls */}
        <div className="flex space-x-3">
          {!isSimulating ? (
            <button
              onClick={startSimulation}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            >
              <Play className="h-4 w-4" />
              <span>Start Simulation</span>
            </button>
          ) : (
            <button
              onClick={resetSimulation}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {isSimulating && (
          <>
            {/* Current vs Original Price */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">Original</div>
                  <div className="text-lg font-bold text-slate-700 dark:text-slate-300">
                    {formatPrice(originalData ? 5000000 : predictedPrice)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">Simulated</div>
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {formatPrice(predictedPrice)}
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Price Change</span>
                  <span className={`text-sm font-bold ${
                    predictedPrice > 5000000 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {predictedPrice > 5000000 ? '+' : ''}
                    {formatPrice(Math.abs(predictedPrice - 5000000))}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Simulation Buttons */}
            <div>
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Quick Simulations
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {quickSimulations.map((sim, index) => (
                  <button
                    key={index}
                    onClick={sim.action}
                    disabled={sim.active}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      sim.active
                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 cursor-not-allowed'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {sim.active ? '✓ ' : ''}{sim.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Sliders */}
            <div>
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Adjust Parameters
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                    Square Footage: {propertyData.squareFootage.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="50"
                    value={propertyData.squareFootage}
                    onChange={(e) => updateProperty('squareFootage', parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded appearance-none cursor-pointer"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                    Property Age: {propertyData.propertyAge} years
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={propertyData.propertyAge}
                    onChange={(e) => updateProperty('propertyAge', parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SimulationPanel;