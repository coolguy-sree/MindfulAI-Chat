import React, { useState, useEffect } from 'react';
import { Brain, Shield, Sparkles, Activity, Lock, Zap } from 'lucide-react';

interface AIFeatureShowcaseProps {
  onFeatureSelect?: (feature: string) => void;
}

const AIFeatureShowcase: React.FC<AIFeatureShowcaseProps> = ({ onFeatureSelect }) => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [processingPower, setProcessingPower] = useState(0);

  useEffect(() => {
    // Simulate AI model loading and initialization
    const loadModel = async () => {
      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setModelLoaded(true);
        
        // Simulate processing power ramping up
        let power = 0;
        const interval = setInterval(() => {
          power += Math.random() * 10;
          if (power > 85) {
            clearInterval(interval);
            power = 85 + Math.random() * 10; // Final value between 85-95
          }
          setProcessingPower(power);
        }, 200);

        return () => clearInterval(interval);
      } catch (error) {
        console.error('Error in AI simulation:', error);
      }
    };

    loadModel();
  }, []);

  const features = [
    {
      id: 'real-time',
      icon: <Activity className="w-6 h-6" />,
      title: 'Real-time Protection',
      description: 'AI-powered monitoring and threat detection',
      stats: {
        accuracy: '99.7%',
        response: '<100ms'
      }
    },
    {
      id: 'sentiment',
      icon: <Brain className="w-6 h-6" />,
      title: 'Sentiment Analysis',
      description: 'Advanced emotional intelligence and context understanding',
      stats: {
        accuracy: '95.8%',
        languages: '100+'
      }
    },
    {
      id: 'prevention',
      icon: <Shield className="w-6 h-6" />,
      title: 'Predictive Prevention',
      description: 'Stop harassment before it happens',
      stats: {
        prevention: '87%',
        detection: '99.2%'
      }
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    setActiveFeature(featureId);
    onFeatureSelect?.(featureId);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl">
      {/* AI Status Indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Brain className="w-8 h-8 text-teal-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">AI Protection System</h2>
        </div>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${modelLoaded ? 'bg-teal-400' : 'bg-orange-400'} animate-pulse`} />
          <span className="text-gray-300 text-sm">
            {modelLoaded ? 'Active' : 'Initializing...'}
          </span>
        </div>
      </div>

      {/* Processing Power Indicator */}
      <div className="bg-slate-700/30 p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Zap className="w-5 h-5 text-teal-400 mr-2" />
            <span className="text-white">Neural Processing</span>
          </div>
          <span className="text-teal-400">{processingPower.toFixed(1)}% Capacity</span>
        </div>
        <div className="w-full bg-slate-600/50 rounded-full h-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-500"
            style={{ width: `${Math.min(processingPower, 100)}%` }}
          />
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => handleFeatureClick(feature.id)}
            className={`text-left p-4 rounded-lg transition-all transform hover:scale-105 ${
              activeFeature === feature.id
                ? 'bg-gradient-to-r from-teal-500/20 to-emerald-500/20 ring-2 ring-teal-400'
                : 'bg-slate-700/30 hover:bg-slate-700/50'
            }`}
          >
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-lg bg-slate-600/50">
                {React.cloneElement(feature.icon, {
                  className: 'w-6 h-6 text-teal-400'
                })}
              </div>
            </div>
            <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-300 text-sm mb-3">{feature.description}</p>
            <div className="flex justify-between text-sm">
              {Object.entries(feature.stats).map(([key, value]) => (
                <div key={key} className="text-teal-400">
                  <span className="text-gray-400">{key}: </span>
                  {value}
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Security Status */}
      <div className="mt-6 bg-slate-700/30 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Lock className="w-5 h-5 text-teal-400 mr-2" />
            <span className="text-white">Neural Security</span>
          </div>
          <div className="flex items-center">
            <Sparkles className="w-5 h-5 text-teal-400 mr-2" />
            <span className="text-teal-400">Enhanced Protection Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFeatureShowcase;