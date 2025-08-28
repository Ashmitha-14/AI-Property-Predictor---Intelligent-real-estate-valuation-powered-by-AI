import React from 'react';
import { MapPin, Square, Bed, Bath, Calendar, Car, Waves, Trees, Home} from 'lucide-react';
import { useProperty } from '../contexts/PropertyContext';

const PropertyInputPanel: React.FC = () => {
  const { propertyData, updateProperty } = useProperty();

  const locations = [
    'Mumbai, Maharashtra',
    'Delhi, NCR',
    'Bangalore, Karnataka',
    'Chennai, Tamil Nadu',
    'Pune, Maharashtra',
    'Hyderabad, Telangana',
  ];

  const handleAmenityChange = (amenity: string, value: boolean) => {
    updateProperty('amenities', { [amenity]: value });
  };

  const handleProximityChange = (type: string, value: number) => {
    updateProperty('proximity', { [type]: value });
  };

  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center">
        <Home className="h-5 w-5 mr-2 text-blue-600" />
        Property Details
      </h2>
      
      <div className="space-y-6">
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            Location
          </label>
          <select
            value={propertyData.location}
            onChange={(e) => updateProperty('location', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Square Footage */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
            <Square className="h-4 w-4 mr-1" />
            Square Footage: {propertyData.squareFootage.toLocaleString()} sq ft
          </label>
          <input
            type="range"
            min="500"
            max="5000"
            step="50"
            value={propertyData.squareFootage}
            onChange={(e) => updateProperty('squareFootage', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>500</span>
            <span>5000</span>
          </div>
        </div>

        {/* Bedrooms & Bathrooms */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              Bedrooms
            </label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateProperty('bedrooms', Math.max(1, propertyData.bedrooms - 1))}
                className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                -
              </button>
              <span className="px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg font-medium">
                {propertyData.bedrooms}
              </span>
              <button
                onClick={() => updateProperty('bedrooms', Math.min(10, propertyData.bedrooms + 1))}
                className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              Bathrooms
            </label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateProperty('bathrooms', Math.max(1, propertyData.bathrooms - 1))}
                className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                -
              </button>
              <span className="px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg font-medium">
                {propertyData.bathrooms}
              </span>
              <button
                onClick={() => updateProperty('bathrooms', Math.min(10, propertyData.bathrooms + 1))}
                className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Property Age */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Property Age: {propertyData.propertyAge} years
          </label>
          <input
            type="range"
            min="0"
            max="50"
            value={propertyData.propertyAge}
            onChange={(e) => updateProperty('propertyAge', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Amenities
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'pool', label: 'Pool', icon: Waves },
              { key: 'garden', label: 'Garden', icon: Trees },
              { key: 'garage', label: 'Garage', icon: Car },
              { key: 'balcony', label: 'Balcony', icon: Square },
            ].map(({ key, label, icon: Icon }) => (
              <label key={key} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={propertyData.amenities[key as keyof typeof propertyData.amenities]}
                  onChange={(e) => handleAmenityChange(key, e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <Icon className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Proximity */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Proximity (km)
          </label>
          <div className="space-y-3">
            {[
              { key: 'school', label: 'School' },
              { key: 'hospital', label: 'Hospital' },
              { key: 'transport', label: 'Transport' },
            ].map(({ key, label }) => (
              <div key={key}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-slate-600 dark:text-slate-400">{label}</span>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {propertyData.proximity[key as keyof typeof propertyData.proximity]}km
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={propertyData.proximity[key as keyof typeof propertyData.proximity]}
                  onChange={(e) => handleProximityChange(key, parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded appearance-none cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInputPanel;