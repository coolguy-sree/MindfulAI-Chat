import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { 
  ArrowLeft, 
  Brain, 
  Globe, 
  Calendar, 
  Star,
  Sparkles,
  Heart,
  Activity,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Shield
} from 'lucide-react';
import { mentalHealthCategories, therapyApproaches } from '../lib/categories';
import { getAIRecommendations } from '../lib/cohere';
import type { TherapistProfile, SelectOption } from '../types';
import MonitoringDashboard from '../components/MonitoringDashboard';
import type { MonitoringAlert } from '../lib/monitoring';
import SafetyPlan from '../components/SafetyPlan';

function ProfessionalHelp() {
  const [selectedCategory, setSelectedCategory] = useState<SelectOption | null>(null);
  const [selectedApproach, setSelectedApproach] = useState<SelectOption | null>(null);
  const [showAIMatch, setShowAIMatch] = useState(false);
  const [matchingStep, setMatchingStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [therapists, setTherapists] = useState<TherapistProfile[]>([]);
  const [usingMockData, setUsingMockData] = useState(false);
  const [safetyPlan, setSafetyPlan] = useState({
    threatLevel: 0.4,
    recommendations: [
      "Enable two-factor authentication on all social media accounts",
      "Set up automated content filtering and blocking",
      "Create a digital evidence documentation system",
      "Establish emergency contact protocols",
      "Schedule regular privacy checkups"
    ],
    onlineStatus: {
      harassment: 75,
      privacy: 85,
      wellbeing: 70
    }
  });

  const handleAlert = (alert: MonitoringAlert) => {
    if (alert.severity === 'critical' || alert.severity === 'high') {
      // Update safety plan based on new alerts
      setSafetyPlan(prev => ({
        ...prev,
        threatLevel: alert.confidence,
        recommendations: alert.suggestedActions
      }));
    }
  };

  const getPlatformName = (url: string): string => {
    if (url.includes('betterhelp')) return 'BetterHelp';
    if (url.includes('talkspace')) return 'Talkspace';
    if (url.includes('psychologytoday')) return 'Psychology Today';
    return 'Visit Website';
  };

  const aiFeatures = [
    {
      title: "Real-Time Matching",
      icon: <Sparkles className="w-6 h-6 text-teal-400" />,
      description: "Our AI analyzes your needs and matches you with the most suitable professionals in seconds"
    },
    {
      title: "Crisis Detection",
      icon: <AlertCircle className="w-6 h-6 text-teal-400" />,
      description: "Advanced AI monitoring for early detection of digital harassment and cyberbullying patterns"
    },
    {
      title: "Safety Planning",
      icon: <Shield className="w-6 h-6 text-teal-400" />,
      description: "AI-generated personalized safety plans for managing online threats and digital well-being"
    }
  ];

  const handleStartMatching = async () => {
    if (!selectedCategory) {
      setError("Please select a primary concern");
      return;
    }

    setShowAIMatch(true);
    setLoading(true);
    setError(null);
    setTherapists([]); // Clear previous results
    setUsingMockData(false);
    
    try {
      // Step 1: Initial Analysis
      setMatchingStep(1);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Step 2: Find Therapists
      setMatchingStep(2);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Step 3: AI Matching
      setMatchingStep(3);
      const userNeeds = `
        Primary concern: ${selectedCategory.label}
        ${selectedApproach ? `Preferred approach: ${selectedApproach.label}` : ''}
        Keywords: ${selectedCategory.keywords?.join(', ') || ''}
        ${selectedApproach ? `Preferred therapy style: ${selectedApproach.description}` : ''}
      `;
      
      const recommendations = await getAIRecommendations(userNeeds);
      setTherapists(recommendations);
      
      // Check if we're using mock data
      if (recommendations.length === 3 && recommendations[0].name === "Dr. Sarah Johnson, Ph.D.") {
        setUsingMockData(true);
      }
    } catch (err) {
      setError("An error occurred while matching. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/peace" 
          className="inline-flex items-center text-teal-400 hover:text-teal-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Support
        </Link>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl animate-fadeIn">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Brain className="w-10 h-10 text-teal-400 mr-3 animate-pulse" />
                <h1 className="text-3xl font-bold text-white">AI-Powered Professional Support</h1>
              </div>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Experience instant, personalized matching with mental health professionals using our advanced AI system.
                Get connected with the right support within minutes.
              </p>
            </div>

            {/* AI Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {aiFeatures.map((feature, index) => (
                <div key={index} className="bg-slate-700/30 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    {feature.icon}
                    <h3 className="text-white font-semibold ml-2">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="mb-12">
              <SafetyPlan
                threatLevel={safetyPlan.threatLevel}
                recommendations={safetyPlan.recommendations}
                onlineStatus={safetyPlan.onlineStatus}
              />
            </div>

            {/* Real-time Monitoring Dashboard */}
            <div className="mb-12">
              <MonitoringDashboard onAlert={handleAlert} />
            </div>

            {/* Selection Form */}
            <div className="bg-slate-700/30 p-6 rounded-lg mb-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-white mb-2">What's your primary concern?</label>
                  <Select
                    options={mentalHealthCategories}
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    className="text-slate-800"
                    placeholder="Select your primary concern..."
                  />
                </div>
                
                <div>
                  <label className="block text-white mb-2">Preferred therapy approach (optional)</label>
                  <Select
                    options={therapyApproaches}
                    value={selectedApproach}
                    onChange={setSelectedApproach}
                    className="text-slate-800"
                    placeholder="Select preferred approach..."
                    isClearable
                  />
                </div>

                {error && (
                  <div className="text-red-400 text-sm">{error}</div>
                )}

                <button 
                  onClick={handleStartMatching}
                  disabled={loading}
                  className="w-full bg-teal-400 hover:bg-teal-500 disabled:bg-teal-400/50 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Finding your perfect match...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Start AI Matching
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Matching Progress */}
            {showAIMatch && (
              <div className="bg-slate-700/30 p-6 rounded-lg mb-8">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-1 bg-slate-700/50 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-teal-400 transition-all duration-1000"
                        style={{ width: `${matchingStep * 33.33}%` }}
                      ></div>
                    </div>
                    <span className="ml-3 text-gray-300">{matchingStep * 33.33}%</span>
                  </div>
                  <p className="text-gray-300">
                    {matchingStep === 1 && "Analyzing your needs and preferences..."}
                    {matchingStep === 2 && "Finding qualified therapists..."}
                    {matchingStep === 3 && "Calculating best matches..."}
                  </p>
                </div>
              </div>
            )}

            {usingMockData && (
              <div className="bg-yellow-500/20 p-4 rounded-lg mb-8">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-yellow-200 text-sm">
                    Note: Due to temporary API limitations, we're showing example recommendations. 
                    Real-time AI matching will be restored shortly.
                  </p>
                </div>
              </div>
            )}

            {/* Results */}
            {therapists.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">Your Personalized Matches</h2>
                {therapists.map((therapist, index) => (
                  <div key={index} className="bg-slate-700/30 p-6 rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold text-white text-lg mr-3">{therapist.name}</h3>
                          <div className="flex items-center text-teal-400">
                            <Star className="w-4 h-4 mr-1" />
                            <span>{therapist.rating}</span>
                          </div>
                        </div>
                        <a 
                          href={therapist.website}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-teal-400 hover:text-teal-300 transition-colors flex items-center"
                        >
                          <Globe className="w-4 h-4 mr-1" />
                          {getPlatformName(therapist.website)}
                        </a>
                      </div>
                      <div className="text-emerald-400">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {therapist.availability}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">Specialties:</h4>
                        <p className="text-gray-300">{therapist.specialty}</p>
                      </div>

                      {therapist.credentials && (
                        <div>
                          <h4 className="text-white font-medium mb-2">Credentials:</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {therapist.credentials.map((credential, credIndex) => (
                              <li key={credIndex} className="flex items-center text-gray-300">
                                <CheckCircle className="w-4 h-4 text-teal-400 mr-2 flex-shrink-0" />
                                <span>{credential}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-slate-600">
                        <div className="flex items-center text-teal-400">
                          <Brain className="w-4 h-4 mr-1" />
                          <span>{therapist.aiMatchScore}% AI Match</span>
                        </div>
                        <a
                          href={therapist.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-teal-400 hover:bg-teal-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                        >
                          <Globe className="w-4 h-4 mr-2" />
                          Find on {getPlatformName(therapist.website)}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Support Footer */}
            <div className="mt-8 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    Need Help Deciding?
                  </h2>
                  <p className="text-gray-300">
                    Our AI can provide personalized guidance based on your specific situation
                  </p>
                </div>
                <Link
                  to="/peace"
                  className="bg-teal-400 hover:bg-teal-500 text-white px-6 py-3 rounded-lg transition-colors flex items-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Get AI Guidance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessionalHelp;