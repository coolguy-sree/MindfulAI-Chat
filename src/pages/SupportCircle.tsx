import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Shield, Heart } from 'lucide-react';
import AISupportCircle from '../components/AISupportCircle';

function SupportCircle() {
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

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-10 h-10 text-teal-400 mr-3 animate-pulse" />
              <h1 className="text-3xl font-bold text-white">AI Support Circle</h1>
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Connect with AI-matched support groups and community members who understand your journey.
              Our AI ensures a safe, supportive environment tailored to your needs.
            </p>
          </div>

          {/* Support Circle */}
          <div className="mb-8">
            <AISupportCircle />
          </div>

          {/* Additional Resources */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl">
            <div className="flex items-center mb-6">
              <Shield className="w-8 h-8 text-teal-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Additional Resources</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                to="/guide/cyberbullying"
                className="bg-slate-700/30 p-4 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <h3 className="text-white font-semibold mb-2">Cyberbullying Guide</h3>
                <p className="text-gray-300 text-sm">
                  Learn about prevention strategies and coping mechanisms
                </p>
              </Link>
              <Link
                to="/guide/digital-wellbeing"
                className="bg-slate-700/30 p-4 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <h3 className="text-white font-semibold mb-2">Digital Wellbeing</h3>
                <p className="text-gray-300 text-sm">
                  Tips for maintaining a healthy online presence
                </p>
              </Link>
              <Link
                to="/emergency-contacts"
                className="bg-slate-700/30 p-4 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <h3 className="text-white font-semibold mb-2">Emergency Support</h3>
                <p className="text-gray-300 text-sm">
                  Access immediate help when needed
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportCircle;