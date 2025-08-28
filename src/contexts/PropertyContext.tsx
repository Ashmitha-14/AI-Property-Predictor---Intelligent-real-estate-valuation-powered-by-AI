import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PropertyData {
  location: string;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  propertyAge: number;
  amenities: {
    pool: boolean;
    garden: boolean;
    garage: boolean;
    balcony: boolean;
    parking: boolean;
  };
  proximity: {
    school: number;
    hospital: number;
    transport: number;
  };
}

interface PropertyContextType {
  propertyData: PropertyData;
  updateProperty: (key: keyof PropertyData, value: any) => void;
  predictedPrice: number;
  confidence: number;
  featureImportance: { feature: string; impact: number; positive: boolean }[];
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [propertyData, setPropertyData] = useState<PropertyData>({
    location: 'Mumbai, Maharashtra',
    squareFootage: 1200,
    bedrooms: 3,
    bathrooms: 2,
    propertyAge: 5,
    amenities: {
      pool: false,
      garden: true,
      garage: true,
      balcony: true,
      parking: true,
    },
    proximity: {
      school: 0.5,
      hospital: 1.2,
      transport: 0.3,
    },
  });

  const [predictedPrice, setPredictedPrice] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const [featureImportance, setFeatureImportance] = useState<{ feature: string; impact: number; positive: boolean }[]>([]);

  // Mock ML prediction function
  const calculatePrice = (data: PropertyData) => {
    let basePrice = 50000; // Base price per sq ft
    
    // Location multiplier
    const locationMultipliers: { [key: string]: number } = {
      'Mumbai, Maharashtra': 1.8,
      'Delhi, NCR': 1.6,
      'Bangalore, Karnataka': 1.4,
      'Chennai, Tamil Nadu': 1.2,
      'Pune, Maharashtra': 1.3,
      'Hyderabad, Telangana': 1.1,
    };
    
    const locationMultiplier = locationMultipliers[data.location] || 1.0;
    basePrice *= locationMultiplier;
    
    // Calculate price based on features
    let price = basePrice * data.squareFootage;
    
    // Room premiums
    price += data.bedrooms * 100000;
    price += data.bathrooms * 75000;
    
    // Age depreciation
    price *= Math.max(0.5, 1 - (data.propertyAge * 0.01));
    
    // Amenities
    if (data.amenities.pool) price *= 1.15;
    if (data.amenities.garden) price *= 1.08;
    if (data.amenities.garage) price *= 1.12;
    if (data.amenities.balcony) price *= 1.05;
    if (data.amenities.parking) price *= 1.10;
    
    // Proximity benefits (closer is better)
    price *= (2 - Math.min(1, data.proximity.school));
    price *= (2 - Math.min(1, data.proximity.hospital * 0.5));
    price *= (2 - Math.min(1, data.proximity.transport));
    
    return Math.round(price);
  };

  // Calculate feature importance
  const calculateFeatureImportance = (data: PropertyData) => {
    const basePrice = calculatePrice({
      ...data,
      amenities: { pool: false, garden: false, garage: false, balcony: false, parking: false },
      proximity: { school: 5, hospital: 5, transport: 5 },
    });
    
    const currentPrice = calculatePrice(data);
    
    const features = [
      {
        feature: 'Location',
        impact: 35,
        positive: true,
      },
      {
        feature: 'Square Footage',
        impact: 25,
        positive: true,
      },
      {
        feature: 'Bedrooms',
        impact: 15,
        positive: data.bedrooms > 2,
      },
      {
        feature: 'Property Age',
        impact: -10,
        positive: data.propertyAge < 10,
      },
      {
        feature: 'Amenities',
        impact: Object.values(data.amenities).filter(Boolean).length * 3,
        positive: true,
      },
      {
        feature: 'School Proximity',
        impact: Math.max(0, 10 - data.proximity.school * 2),
        positive: data.proximity.school < 1,
      },
    ];
    
    return features.filter(f => Math.abs(f.impact) > 1);
  };

  const updateProperty = (key: keyof PropertyData, value: any) => {
    if (key === 'amenities') {
      setPropertyData(prev => ({
        ...prev,
        amenities: { ...prev.amenities, ...value }
      }));
    } else if (key === 'proximity') {
      setPropertyData(prev => ({
        ...prev,
        proximity: { ...prev.proximity, ...value }
      }));
    } else {
      setPropertyData(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  useEffect(() => {
    const price = calculatePrice(propertyData);
    const importance = calculateFeatureImportance(propertyData);
    const conf = Math.min(95, Math.max(75, 85 + Math.random() * 10));
    
    setPredictedPrice(price);
    setFeatureImportance(importance);
    setConfidence(conf);
  }, [propertyData]);

  return (
    <PropertyContext.Provider value={{
      propertyData,
      updateProperty,
      predictedPrice,
      confidence,
      featureImportance,
    }}>
      {children}
    </PropertyContext.Provider>
  );
};