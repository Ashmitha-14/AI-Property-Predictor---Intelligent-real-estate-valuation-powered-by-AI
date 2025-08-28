import React from 'react';
import { Wrench, TrendingUp, DollarSign } from 'lucide-react';
import { useProperty } from '../contexts/PropertyContext';

const RenovationRecommendations: React.FC = () => {
  const { propertyData, predictedPrice } = useProperty();

  const recommendations = [
    {
      title: 'Add Swimming Pool',
      cost: '₹8-12L',
      valueIncrease: '₹15-20L',
      roi: '65%',
      timeframe: '3-4 months',
      description: 'Premium amenity that significantly increases property value in your area',
      suitable: !propertyData.amenities.pool && propertyData.squareFootage > 1500,
    },
    {
      title: 'Modern Kitchen Renovation',
      cost: '₹3-5L',
      valueIncrease: '₹6-8L',
      roi: '75%',
      timeframe: '1-2 months',
      description: 'Updated kitchen with modern appliances and design',
      suitable: propertyData.propertyAge > 10,
    },
    {
      title: 'Add Covered Parking',
      cost: '₹2-3L',
      valueIncrease: '₹4-5L',
      roi: '55%',
      timeframe: '2-3 weeks',
      description: 'Essential amenity for urban properties',
      suitable: !propertyData.amenities.garage && !propertyData.amenities.parking,
    },
    {
      title: 'Bathroom Upgrades',
      cost: '₹1.5-2.5L',
      valueIncrease: '₹3-4L',
      roi: '70%',
      timeframe: '3-4 weeks',
      description: 'Modern fixtures and premium finishes',
      suitable: propertyData.bathrooms >= 2 && propertyData.propertyAge > 8,
    },
  ];

  const suitableRecommendations = recommendations.filter(rec => rec.suitable).slice(0, 3);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center">
        <Wrench className="h-5 w-5 mr-2 text-orange-600" />
        Renovation Recommendations
      </h2>

      <div className="space-y-4">
        {suitableRecommendations.map((rec, index) => (
          <div key={index} className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-700">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                {rec.title}
              </h3>
              <div className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                {rec.roi} ROI
              </div>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              {rec.description}
            </p>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center space-x-1">
                <DollarSign className="h-3 w-3 text-red-500" />
                <span className="text-slate-600 dark:text-slate-400">Cost: {rec.cost}</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-slate-600 dark:text-slate-400">Value: {rec.valueIncrease}</span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-orange-200 dark:border-orange-700">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Timeline: {rec.timeframe}
                </span>
                <button className="text-xs bg-orange-600 text-white px-3 py-1 rounded-full hover:bg-orange-700 transition-colors">
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
          Value Optimization Tips
        </h3>
        <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
          <li>• Focus on renovations with highest ROI for your area</li>
          <li>• Current market favors modern amenities and energy efficiency</li>
          <li>• Your property could reach {formatPrice(predictedPrice * 1.2)} with optimal upgrades</li>
        </ul>
      </div>
    </div>
  );
};

export default RenovationRecommendations;