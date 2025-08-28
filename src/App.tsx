import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { PropertyProvider } from './contexts/PropertyContext';
import Header from './components/Header';
import PropertyInputPanel from './components/PropertyInputPanel';
import PredictionDisplay from './components/PredictionDisplay';
import FeatureImportanceChart from './components/FeatureImportanceChart';
import SimulationPanel from './components/SimulationPanel';
import RenovationRecommendations from './components/RenovationRecommendations';
import VoiceInput from './components/VoiceInput';

function App() {
  return (
    <ThemeProvider>
      <PropertyProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
          <Header />
          <main className="container mx-auto px-4 py-8 space-y-8">
            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Property Inputs */}
              <div className="lg:col-span-1 space-y-6">
                <PropertyInputPanel />
                <VoiceInput />
              </div>
              
              {/* Middle Column - Prediction & Charts */}
              <div className="lg:col-span-1 space-y-6">
                <PredictionDisplay />
                <FeatureImportanceChart />
              </div>
              
              {/* Right Column - Simulation & Recommendations */}
              <div className="lg:col-span-1 space-y-6">
                <SimulationPanel />
                <RenovationRecommendations />
              </div>
            </div>
          </main>
        </div>
      </PropertyProvider>
    </ThemeProvider>
  );
}

export default App;