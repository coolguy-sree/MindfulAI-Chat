import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Book, Target, Users, AlertTriangle, Brain, BarChart as ChartBar, Globe, Lightbulb, Smartphone } from 'lucide-react';

function CyberbullyingGuide() {
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

        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl animate-fadeIn">
            <div className="flex items-center mb-6">
              <Shield className="w-10 h-10 text-teal-400 mr-3" />
              <h1 className="text-3xl font-bold text-white">Cyberbullying Prevention Guide</h1>
            </div>

            <div className="space-y-8">
              {/* Introduction */}
              <section className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  This comprehensive AI-powered guide delves deep into the complex world of cyberbullying, 
                  offering research-backed strategies and expert insights to help you navigate, prevent, 
                  and overcome digital harassment. Understanding cyberbullying is the first step toward 
                  creating a safer online environment for everyone.
                </p>
              </section>

              {/* Key Statistics */}
              <section className="bg-slate-700/30 p-6 rounded-lg space-y-4">
                <div className="flex items-center mb-4">
                  <ChartBar className="w-6 h-6 text-teal-400 mr-2" />
                  <h2 className="text-xl font-semibold text-white">Critical Statistics</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-teal-400 mb-3">Global Impact</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-teal-400 mr-2">•</span>
                        60% of teenagers have experienced cyberbullying
                      </li>
                      <li className="flex items-start">
                        <span className="text-teal-400 mr-2">•</span>
                        87% of young people have witnessed cyberbullying
                      </li>
                      <li className="flex items-start">
                        <span className="text-teal-400 mr-2">•</span>
                        71% of cyberbullying occurs on social media platforms
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-teal-400 mb-3">Mental Health Impact</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-teal-400 mr-2">•</span>
                        64% report anxiety after cyberbullying incidents
                      </li>
                      <li className="flex items-start">
                        <span className="text-teal-400 mr-2">•</span>
                        38% experience depression-related symptoms
                      </li>
                      <li className="flex items-start">
                        <span className="text-teal-400 mr-2">•</span>
                        41% develop social anxiety and trust issues
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Digital Footprint Impact */}
              <section className="bg-slate-700/30 p-6 rounded-lg space-y-4">
                <div className="flex items-center mb-4">
                  <Globe className="w-6 h-6 text-teal-400 mr-2" />
                  <h2 className="text-xl font-semibold text-white">Digital Footprint & Long-term Impact</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Cyberbullying leaves lasting digital traces that can have far-reaching consequences:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>
                        <strong className="text-white">Permanent Digital Record:</strong> Online harassment can be archived and resurface years later, affecting educational and career opportunities.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>
                        <strong className="text-white">Viral Spread:</strong> Cyberbullying content can spread exponentially within hours, reaching thousands of viewers.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>
                        <strong className="text-white">Identity Impact:</strong> Digital harassment can affect one's online reputation and personal brand for years to come.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Modern Forms of Cyberbullying */}
              <section className="bg-slate-700/30 p-6 rounded-lg space-y-4">
                <div className="flex items-center mb-4">
                  <Smartphone className="w-6 h-6 text-teal-400 mr-2" />
                  <h2 className="text-xl font-semibold text-white">Emerging Forms of Cyberbullying</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-teal-400">Social Media Tactics</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-teal-400 mr-2">•</span>
                        Cancel culture and mass reporting
                      </li>
                      <li className="flex items-start">
                        <span className="text-teal-400 mr-2">•</span>
                        Deepfake harassment
                      </li>
                      <li className="flex items-start">
                        <span className="text-teal-400 mr-2">•</span>
                        Coordinated hate campaigns
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-teal-400">Gaming & Virtual Worlds</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-teal-400 mr-2">•</span>
                        Virtual reality harassment
                      </li>
                      <li className="flex items-start">
                        <span className="text-teal-400 mr-2">•</span>
                        In-game bullying and exclusion
                      </li>
                      <li className="flex items-start">
                        <span className="text-teal-400 mr-2">•</span>
                        Swatting and doxxing
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* AI-Powered Prevention Strategies */}
              <section className="bg-slate-700/30 p-6 rounded-lg space-y-4">
                <div className="flex items-center mb-4">
                  <Lightbulb className="w-6 h-6 text-teal-400 mr-2" />
                  <h2 className="text-xl font-semibold text-white">AI-Enhanced Prevention Strategies</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Our AI analysis suggests these advanced strategies for cyberbullying prevention:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-teal-400 mb-3">Digital Defense</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start">
                          <span className="text-teal-400 mr-2">•</span>
                          Use AI-powered content filters
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-400 mr-2">•</span>
                          Implement smart blocking algorithms
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-400 mr-2">•</span>
                          Enable automated threat detection
                        </li>
                      </ul>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-teal-400 mb-3">Behavioral Patterns</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start">
                          <span className="text-teal-400 mr-2">•</span>
                          Recognize early warning signs
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-400 mr-2">•</span>
                          Monitor digital behavior changes
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-400 mr-2">•</span>
                          Track emotional response patterns
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Response Protocol */}
              <section className="bg-slate-700/30 p-6 rounded-lg space-y-4">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-teal-400 mr-2" />
                  <h2 className="text-xl font-semibold text-white">Advanced Response Protocol</h2>
                </div>
                <ol className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="bg-teal-400/20 text-teal-400 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                    <div>
                      <h4 className="font-medium text-white mb-1">Digital Evidence Collection</h4>
                      <p>Use AI-powered tools to automatically capture and timestamp harassment evidence</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-teal-400/20 text-teal-400 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                    <div>
                      <h4 className="font-medium text-white mb-1">Pattern Recognition</h4>
                      <p>Analyze harassment patterns to predict and prevent future incidents</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-teal-400/20 text-teal-400 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                    <div>
                      <h4 className="font-medium text-white mb-1">Support Network Activation</h4>
                      <p>Engage with AI-matched support groups and counseling resources</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-teal-400/20 text-teal-400 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                    <div>
                      <h4 className="font-medium text-white mb-1">Recovery Strategy</h4>
                      <p>Implement personalized digital wellness plans for long-term recovery</p>
                    </div>
                  </li>
                </ol>
              </section>

              {/* Call to Action */}
              <section className="bg-gradient-to-r from-teal-500/20 to-emerald-500/20 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-white">Ready to Take Action?</h2>
                    <p className="text-gray-300">Our AI system can help create a personalized safety plan</p>
                  </div>
                  <Link
                    to="/peace"
                    className="bg-teal-400 hover:bg-teal-500 text-white px-6 py-3 rounded-lg transition-colors flex items-center"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Get AI Support
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CyberbullyingGuide;