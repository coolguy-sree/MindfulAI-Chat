import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Heart, MessageCircle, Shield, Sparkles, ExternalLink, Newspaper } from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  return (
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
          <button 
            onClick={() => navigate('/peace')}
            className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-teal-600 hover:to-emerald-600 transition-all transform hover:scale-105 animate-pulse"
          >
            Find Peace Now
          </button>
        </div>
      </header>

      {/* Rest of the components remain the same */}
      {/* ... */}
    </div>
  );
}

export default Home;