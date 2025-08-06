import React from 'react';
import { Shield, AlertTriangle, Brain, Heart, Lock, Globe } from 'lucide-react';

interface SafetyPlanProps {
  threatLevel: number;
  recommendations: string[];
  onlineStatus: {
    harassment: number;
    privacy: number;
    wellbeing: number;
  };
}

const SafetyPlan: React.FC<SafetyPlanProps> = ({ threatLevel, recommendations, onlineStatus }) => {
  const getThreatColor = (level: number) => {
    if (level >= 0.8) return 'text-red-400';
    if (level >= 0.6) return 'text-orange-400';
    if (level >= 0.4) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getStatusColor = (value: number) => {
    if (value >= 80) return 'text-green-400';
    if (value >= 60) return 'text-yellow-400';
    if (value >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl">
      <div className="flex items-center mb-6">
        <Shield className="w-8 h-8 text-teal-400 mr-3" />
        <h2 className="text-2xl font-bold text-white">AI Safety Plan</h2>
      </div>

      {/* Threat Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-700/30 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-teal-400 mr-2" />
            <h3 className="text-white font-semibold">Threat Level</h3>
          </div>
          <div className={`text-2xl font-bold ${getThreatColor(threatLevel)}`}>
            {(threatLevel * 100).toFixed(0)}%
          </div>
        </div>

        <div className="bg-slate-700/30 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Brain className="w-5 h-5 text-teal-400 mr-2" />
            <h3 className="text-white font-semibold">AI Protection</h3>
          </div>
          <div className="text-2xl font-bold text-teal-400">Active</div>
        </div>

        <div className="bg-slate-700/30 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Heart className="w-5 h-5 text-teal-400 mr-2" />
            <h3 className="text-white font-semibold">Support Status</h3>
          </div>
          <div className="text-2xl font-bold text-emerald-400">Available</div>
        </div>
      </div>

      {/* Online Safety Status */}
      <div className="bg-slate-700/30 p-6 rounded-lg mb-8">
        <h3 className="text-white font-semibold mb-4 flex items-center">
          <Globe className="w-5 h-5 text-teal-400 mr-2" />
          Online Safety Status
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-300">Harassment Protection</span>
              <span className={getStatusColor(onlineStatus.harassment)}>
                {onlineStatus.harassment}%
              </span>
            </div>
            <div className="w-full bg-slate-600/50 rounded-full h-2">
              <div
                className={`h-full rounded-full ${getStatusColor(onlineStatus.harassment)} bg-current`}
                style={{ width: `${onlineStatus.harassment}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-300">Privacy Settings</span>
              <span className={getStatusColor(onlineStatus.privacy)}>
                {onlineStatus.privacy}%
              </span>
            </div>
            <div className="w-full bg-slate-600/50 rounded-full h-2">
              <div
                className={`h-full rounded-full ${getStatusColor(onlineStatus.privacy)} bg-current`}
                style={{ width: `${onlineStatus.privacy}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-300">Digital Wellbeing</span>
              <span className={getStatusColor(onlineStatus.wellbeing)}>
                {onlineStatus.wellbeing}%
              </span>
            </div>
            <div className="w-full bg-slate-600/50 rounded-full h-2">
              <div
                className={`h-full rounded-full ${getStatusColor(onlineStatus.wellbeing)} bg-current`}
                style={{ width: `${onlineStatus.wellbeing}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-slate-700/30 p-6 rounded-lg">
        <h3 className="text-white font-semibold mb-4 flex items-center">
          <Lock className="w-5 h-5 text-teal-400 mr-2" />
          AI-Generated Safety Recommendations
        </h3>
        <ul className="space-y-3">
          {recommendations.map((rec, index) => (
            <li key={index} className="flex items-start text-gray-300">
              <Shield className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0 mt-1" />
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SafetyPlan;