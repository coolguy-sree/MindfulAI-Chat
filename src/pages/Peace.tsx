import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Heart, Shield, MessageCircle, ArrowLeft } from 'lucide-react';
import MonitoringDashboard from '../components/MonitoringDashboard';
import AIChat from '../components/AIChat';
import type { MonitoringAlert } from '../lib/monitoring';

function Peace() {
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);

  const handleEmergencyDetected = () => {
    setShowEmergencyAlert(true);
  };

  const handleAlert = (alert: MonitoringAlert) => {
    if (alert.severity === 'critical' || alert.severity === 'high') {
      setShowEmergencyAlert(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-teal-400 hover:text-teal-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Support Options */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl animate-fadeIn">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Shield className="w-6 h-6 text-teal-400 mr-2" />
                Support Options
              </h2>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowAIChat(true)}
                  className="w-full text-left px-4 py-3 rounded-lg bg-slate-700/50 text-white hover:bg-slate-700 transition-colors flex items-center"
                >
                  <MessageCircle className="w-5 h-5 text-teal-400 mr-2" />
                  Chat with AI Support
                </button>
                <Link 
                  to="/support-circle"
                  className="w-full text-left px-4 py-3 rounded-lg bg-slate-700/50 text-white hover:bg-slate-700 transition-colors flex items-center"
                >
                  <Heart className="w-5 h-5 text-teal-400 mr-2" />
                  Support Circle
                </Link>
                <Link 
                  to="/professional-help"
                  className="w-full text-left px-4 py-3 rounded-lg bg-slate-700/50 text-white hover:bg-slate-700 transition-colors flex items-center"
                >
                  <Brain className="w-5 h-5 text-teal-400 mr-2" />
                  Get Professional Help
                </Link>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl animate-fadeIn delay-100">
              <h2 className="text-2xl font-bold text-white mb-4">Resources</h2>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link to="/guide/cyberbullying" className="hover:text-teal-400 transition-colors">
                    • Cyberbullying Prevention Guide
                  </Link>
                </li>
                <li>
                  <Link to="/guide/digital-wellbeing" className="hover:text-teal-400 transition-colors">
                    • Digital Well-being Tips
                  </Link>
                </li>
                <li>
                  <Link to="/emergency-contacts" className="hover:text-teal-400 transition-colors">
                    • Emergency Contacts
                  </Link>
                </li>
              </ul>
            </div>

            {showEmergencyAlert && (
              <div className="bg-red-500/20 p-4 rounded-xl animate-fadeIn">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">Emergency Support Available</h3>
                    <p className="text-gray-300 text-sm mb-2">
                      It seems you might be in a difficult situation. Immediate support is available.
                    </p>
                    <Link
                      to="/emergency-contacts"
                      className="text-red-400 hover:text-red-300 text-sm font-medium"
                    >
                      View Emergency Contacts →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            {showAIChat ? (
              <>
                <AIChat onEmergencyDetected={handleEmergencyDetected} />
                <MonitoringDashboard onAlert={handleAlert} />
              </>
            ) : (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 h-full flex flex-col items-center justify-center text-center animate-fadeIn">
                <MessageCircle className="w-16 h-16 text-teal-400 mb-4 animate-pulse" />
                <h2 className="text-2xl font-bold text-white mb-3">Welcome to Your Safe Space</h2>
                <p className="text-gray-300 mb-6 max-w-md">
                  Choose from AI-powered support options to get help with online harassment and digital well-being concerns.
                </p>
                <button
                  onClick={() => setShowAIChat(true)}
                  className="bg-teal-400 hover:bg-teal-500 text-white px-6 py-3 rounded-lg transition-colors flex items-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Chat
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Peace;