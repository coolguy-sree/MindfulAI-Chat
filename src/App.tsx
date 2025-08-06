import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Brain, Heart, MessageCircle, Shield, Sparkles, Users, Newspaper, TrendingUp, AlertTriangle, Globe, X, ExternalLink } from 'lucide-react';
import Peace from './pages/Peace';
import CyberbullyingGuide from './pages/CyberbullyingGuide';
import DigitalWellbeing from './pages/DigitalWellbeing';
import EmergencyContacts from './pages/EmergencyContacts';
import ProfessionalHelp from './pages/ProfessionalHelp';
import SupportCircle from './pages/SupportCircle';
import AIFeatureShowcase from './components/AIFeatureShowcase';

function App() {
  const navigate = useNavigate();
  const [selectedNews, setSelectedNews] = useState<any>(null);

  const socialMediaNews = [
    {
      id: 1,
      category: 'Trending',
      title: 'New Social Media Guidelines Focus on Mental Health',
      description: 'Major platforms introduce features to promote digital well-being',
      timestamp: '2 hours ago',
      impact: 'positive',
      icon: <Globe className="w-6 h-6" />,
      fullContent: {
        summary: 'Leading social media platforms have announced comprehensive guidelines prioritizing user mental health and digital well-being.',
        details: [
          'Instagram introduces mandatory break reminders',
          'TikTok expands screen time management tools',
          'Facebook enhances content filtering options'
        ],
        source: 'https://blog.instagram.com/safety',
        readMore: 'https://about.instagram.com/safety'
      }
    },
    {
      id: 2,
      category: 'Alert',
      title: 'Rising Cyberbullying Trends in Gaming Communities',
      description: 'AI-powered monitoring shows 27% increase in toxic behavior',
      timestamp: '4 hours ago',
      impact: 'negative',
      icon: <AlertTriangle className="w-6 h-6" />,
      fullContent: {
        summary: 'Recent analysis reveals concerning patterns of increased harassment in online gaming spaces, particularly affecting young users.',
        details: [
          'Spike in targeted harassment during peak gaming hours',
          'New forms of coordinated toxic behavior emerging',
          'Gaming platforms implementing stricter moderation'
        ],
        source: 'https://www.esafety.gov.au/gaming',
        readMore: 'https://www.esafety.gov.au/key-issues/cyberbullying'
      }
    },
    {
      id: 3,
      category: 'Update',
      title: 'Instagram Enhances Anti-Harassment Tools',
      description: 'New features help users manage unwanted interactions',
      timestamp: '6 hours ago',
      impact: 'positive',
      icon: <Shield className="w-6 h-6" />,
      fullContent: {
        summary: 'Instagram rolls out advanced protection features to combat online harassment and provide users with more control over their experience.',
        details: [
          'Bulk comment management and filtering',
          'Enhanced blocking capabilities',
          'AI-powered harassment detection'
        ],
        source: 'https://about.instagram.com/blog',
        readMore: 'https://help.instagram.com/477434105621119'
      }
    }
  ];

  return (
    <Routes>
      <Route path="/peace" element={<Peace />} />
      <Route path="/guide/cyberbullying" element={<CyberbullyingGuide />} />
      <Route path="/guide/digital-wellbeing" element={<DigitalWellbeing />} />
      <Route path="/emergency-contacts" element={<EmergencyContacts />} />
      <Route path="/professional-help" element={<ProfessionalHelp />} />
      <Route path="/support-circle" element={<SupportCircle />} />
      <Route path="/" element={
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-900">
          {/* Hero Section */}
          <header className="container mx-auto px-4 py-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-emerald-500/30 animate-gradient"></div>
              </div>
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <Brain className="w-12 h-12 text-teal-400 mr-2 animate-float" />
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400 animate-shimmer">
                  MindfulAI Chat
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8 animate-fadeIn">
                Your safe space away from online harassment and social media pressure
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => navigate('/peace')}
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-teal-600 hover:to-emerald-600 transition-all transform hover:scale-105 animate-pulse flex items-center"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Find Peace Now
                </button>
                <button 
                  onClick={() => navigate('/support-circle')}
                  className="bg-slate-700/50 backdrop-blur-sm text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-slate-700 transition-all transform hover:scale-105 flex items-center"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Join Support Circle
                </button>
              </div>
            </div>
          </header>

          {/* Quick Access Cards */}
          <section className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 p-6 rounded-xl backdrop-blur-sm transform hover:scale-105 transition-all cursor-pointer"
                   onClick={() => navigate('/emergency-contacts')}>
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                  <h3 className="text-xl font-semibold text-white ml-3">Emergency Help</h3>
                </div>
                <p className="text-gray-300">Immediate support available 24/7</p>
              </div>
              <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 p-6 rounded-xl backdrop-blur-sm transform hover:scale-105 transition-all cursor-pointer"
                   onClick={() => navigate('/guide/digital-wellbeing')}>
                <div className="flex items-center mb-4">
                  <Heart className="w-8 h-8 text-teal-400" />
                  <h3 className="text-xl font-semibold text-white ml-3">Wellness Guide</h3>
                </div>
                <p className="text-gray-300">Tips for digital well-being</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-xl backdrop-blur-sm transform hover:scale-105 transition-all cursor-pointer"
                   onClick={() => navigate('/professional-help')}>
                <div className="flex items-center mb-4">
                  <Brain className="w-8 h-8 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white ml-3">Professional Help</h3>
                </div>
                <p className="text-gray-300">Connect with experts</p>
              </div>
            </div>
          </section>

          {/* AI Feature Showcase */}
          <section className="container mx-auto px-4 py-12">
            <AIFeatureShowcase />
          </section>

          {/* Social Media News Section */}
          <section className="container mx-auto px-4 py-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Newspaper className="w-8 h-8 text-teal-400 mr-2" />
                <h2 className="text-3xl font-bold text-white">Social Media Pulse</h2>
              </div>
              <p className="text-gray-300">Real-time updates on digital well-being and online safety</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {socialMediaNews.map((news) => (
                <button
                  key={news.id}
                  onClick={() => setSelectedNews(news)}
                  className="text-left bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-2 rounded-lg ${
                      news.impact === 'positive' ? 'bg-teal-400/20' : 'bg-red-400/20'
                    }`}>
                      {React.cloneElement(news.icon, {
                        className: `${
                          news.impact === 'positive' ? 'text-teal-400' : 'text-red-400'
                        }`
                      })}
                    </div>
                    <span className="ml-2 text-sm text-gray-400">{news.category}</span>
                    <span className="ml-auto text-xs text-gray-400">{news.timestamp}</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">{news.title}</h3>
                  <p className="text-gray-300 text-sm">{news.description}</p>
                </button>
              ))}
            </div>
          </section>

          {/* News Modal */}
          {selectedNews && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-slate-800 rounded-xl max-w-2xl w-full p-6 relative animate-fadeIn">
                <button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="flex items-center mb-6">
                  <div className={`p-2 rounded-lg ${
                    selectedNews.impact === 'positive' ? 'bg-teal-400/20' : 'bg-red-400/20'
                  }`}>
                    {React.cloneElement(selectedNews.icon, {
                      className: `${
                        selectedNews.impact === 'positive' ? 'text-teal-400' : 'text-red-400'
                      }`
                    })}
                  </div>
                  <div className="ml-3">
                    <span className="text-sm text-gray-400">{selectedNews.category}</span>
                    <h3 className="text-xl font-semibold text-white">{selectedNews.title}</h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-300">{selectedNews.fullContent.summary}</p>
                  
                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Key Points:</h4>
                    <ul className="space-y-2">
                      {selectedNews.fullContent.details.map((detail, index) => (
                        <li key={index} className="flex items-start text-gray-300">
                          <span className="text-teal-400 mr-2">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <span className="text-sm text-gray-400">{selectedNews.timestamp}</span>
                    <a
                      href={selectedNews.fullContent.readMore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      Read More <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<MessageCircle className="w-8 h-8 text-teal-400 animate-bounce" />}
                title="24/7 Support"
                description="Instant support when facing online harassment or cyberbullying"
              />
              <FeatureCard
                icon={<Shield className="w-8 h-8 text-teal-400 animate-pulse" />}
                title="Safe Space"
                description="A protected environment to discuss your social media experiences without judgment"
              />
              <FeatureCard
                icon={<Sparkles className="w-8 h-8 text-teal-400 animate-spin-slow" />}
                title="Smart Solutions"
                description="AI-powered strategies to handle digital anxiety and online negativity"
              />
            </div>
          </section>

          {/* Social Proof Section */}
          <section className="bg-slate-800 py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-white animate-fadeIn">Real Stories of Digital Healing</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TestimonialCard
                  image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150"
                  name="Sarah J."
                  text="After experiencing cyberbullying, MindfulAI helped me regain my confidence and set healthy online boundaries."
                />
                <TestimonialCard
                  image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150"
                  name="Michael R."
                  text="The app helped me recognize signs of social media addiction and develop better digital habits."
                />
                <TestimonialCard
                  image="https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=150&h=150"
                  name="Emily L."
                  text="Finally found support that understands the unique challenges of being a young person online."
                />
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="py-16 bg-gradient-to-r from-slate-900 to-indigo-900">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6 rounded-xl bg-slate-800/50 backdrop-blur-sm transform hover:scale-105 transition-transform animate-fadeInUp">
                  <h3 className="text-4xl font-bold text-teal-400 mb-2">70%</h3>
                  <p className="text-gray-300">of users report reduced social media anxiety</p>
                </div>
                <div className="p-6 rounded-xl bg-slate-800/50 backdrop-blur-sm transform hover:scale-105 transition-transform animate-fadeInUp delay-100">
                  <h3 className="text-4xl font-bold text-teal-400 mb-2">24/7</h3>
                  <p className="text-gray-300">continuous support and monitoring</p>
                </div>
                <div className="p-6 rounded-xl bg-slate-800/50 backdrop-blur-sm transform hover:scale-105 transition-transform animate-fadeInUp delay-200">
                  <h3 className="text-4xl font-bold text-teal-400 mb-2">50K+</h3>
                  <p className="text-gray-300">users helped with online harassment</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="container mx-auto px-4 py-16 text-center">
            <div className="bg-gradient-to-r from-slate-800 to-indigo-800 rounded-2xl p-12 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-emerald-500/30 animate-gradient"></div>
                </div>
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4 text-white animate-fadeIn">Take Back Control of Your Digital Life</h2>
                <p className="text-gray-300 mb-8 animate-fadeIn delay-100">Join thousands who've found their way back to digital well-being</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={() => navigate('/peace')}
                    className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-teal-600 hover:to-emerald-600 transition-all transform hover:scale-105 animate-float flex items-center"
                  >
                    <Shield className="w-5 h-5 mr-2" />
                    Begin Your Healing Journey
                  </button>
                  <button 
                    onClick={() => navigate('/guide/digital-wellbeing')}
                    className="bg-slate-700/50 backdrop-blur-sm text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-slate-700 transition-all transform hover:scale-105 flex items-center"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Explore Resources
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-slate-900 py-8">
            <div className="container mx-auto px-4 text-center text-gray-400">
              <div className="flex items-center justify-center mb-4">
                <Heart className="w-5 h-5 text-teal-400 mr-2 animate-pulse" />
                <p>Supporting your digital well-being</p>
              </div>
              <p>© 2024 MindfulAI Chat. All rights reserved.</p>
            </div>
          </footer>
        </div>
      } />
    </Routes>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-teal-500/10 transition-all transform hover:scale-105 animate-fadeIn">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

function TestimonialCard({ image, name, text }) {
  return (
    <div className="bg-slate-700/50 backdrop-blur-sm p-6 rounded-xl transform hover:scale-105 transition-transform animate-fadeIn">
      <div className="flex items-center mb-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4 ring-2 ring-teal-400" />
        <h4 className="font-semibold text-white">{name}</h4>
      </div>
      <p className="text-gray-300 italic">"{text}"</p>
    </div>
  );
}

export default App;