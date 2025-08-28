import React, { useState, useRef } from 'react';
import { Mic, MicOff, MessageCircle } from 'lucide-react';
import { useProperty } from '../contexts/PropertyContext';

const VoiceInput: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const { updateProperty } = useProperty();
  const recognitionRef = useRef<any>(null);

  React.useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
    }
  }, []);

  const startListening = () => {
    if (!isSupported) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setTranscript(transcript);
      processVoiceCommand(transcript);
    };

    recognitionRef.current.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const processVoiceCommand = (command: string) => {
    // Parse common voice commands
    if (command.includes('bedroom')) {
      const match = command.match(/(\d+)\s*bedroom/);
      if (match) {
        updateProperty('bedrooms', parseInt(match[1]));
      }
    }
    
    if (command.includes('bathroom')) {
      const match = command.match(/(\d+)\s*bathroom/);
      if (match) {
        updateProperty('bathrooms', parseInt(match[1]));
      }
    }

    if (command.includes('square feet') || command.includes('sq ft')) {
      const match = command.match(/(\d+)\s*(?:square feet|sq ft)/);
      if (match) {
        updateProperty('squareFootage', parseInt(match[1]));
      }
    }

    if (command.includes('pool')) {
      updateProperty('amenities', { pool: true });
    }

    if (command.includes('garage')) {
      updateProperty('amenities', { garage: true });
    }

    if (command.includes('garden')) {
      updateProperty('amenities', { garden: true });
    }

    // Location parsing
    const locations = ['mumbai', 'delhi', 'bangalore', 'chennai', 'pune', 'hyderabad'];
    for (const location of locations) {
      if (command.includes(location)) {
        const locationMap: { [key: string]: string } = {
          'mumbai': 'Mumbai, Maharashtra',
          'delhi': 'Delhi, NCR',
          'bangalore': 'Bangalore, Karnataka',
          'chennai': 'Chennai, Tamil Nadu',
          'pune': 'Pune, Maharashtra',
          'hyderabad': 'Hyderabad, Telangana',
        };
        updateProperty('location', locationMap[location]);
        break;
      }
    }
  };

  if (!isSupported) {
    return (
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="text-center text-slate-500 dark:text-slate-400">
          <MicOff className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm">Voice input not supported in this browser</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center">
        <MessageCircle className="h-5 w-5 mr-2 text-green-600" />
        Voice Input
      </h2>

      <div className="space-y-4">
        <div className="text-center">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`p-4 rounded-full transition-all duration-200 ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white'
            }`}
          >
            {isListening ? (
              <MicOff className="h-6 w-6" />
            ) : (
              <Mic className="h-6 w-6" />
            )}
          </button>
          
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            {isListening ? 'Listening...' : 'Click to speak'}
          </p>
        </div>

        {transcript && (
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <strong>You said:</strong> "{transcript}"
            </p>
          </div>
        )}

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
            Voice Commands
          </h3>
          <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
            <li>• "3 bedroom house in Mumbai"</li>
            <li>• "1500 square feet with pool"</li>
            <li>• "Add garage and garden"</li>
            <li>• "2 bathroom property"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VoiceInput;