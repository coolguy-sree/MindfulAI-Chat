import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Globe, Clock, Shield, Heart, AlertCircle, Headphones, MessageCircle } from 'lucide-react';

function EmergencyContacts() {
  const emergencyResources = [
    {
      category: "Crisis Helplines",
      icon: <Phone className="w-6 h-6 text-teal-400" />,
      resources: [
        {
          name: "National Suicide Prevention Lifeline",
          contact: "988",
          hours: "24/7",
          description: "Free, confidential support for people in distress"
        },
        {
          name: "Crisis Text Line",
          contact: "Text HOME to 741741",
          hours: "24/7",
          description: "Free crisis counseling via text message"
        },
        {
          name: "SAMHSA's National Helpline",
          contact: "1-800-662-4357",
          hours: "24/7",
          description: "Treatment referral and information service"
        }
      ]
    },
    {
      category: "Cyberbullying Support",
      icon: <Shield className="w-6 h-6 text-teal-400" />,
      resources: [
        {
          name: "Cyberbullying Research Center",
          contact: "cyberbullying.org",
          hours: "Online Resource",
          description: "Research and resources for cyberbullying prevention"
        },
        {
          name: "StopBullying.gov",
          contact: "stopbullying.gov",
          hours: "Online Resource",
          description: "Government resource for bullying prevention"
        }
      ]
    },
    {
      category: "Mental Health Support",
      icon: <Heart className="w-6 h-6 text-teal-400" />,
      resources: [
        {
          name: "NAMI HelpLine",
          contact: "1-800-950-6264",
          hours: "M-F, 10 AM - 10 PM ET",
          description: "Mental health information and referrals"
        },
        {
          name: "Trevor Project (LGBTQ+)",
          contact: "1-866-488-7386",
          hours: "24/7",
          description: "Crisis intervention and suicide prevention"
        }
      ]
    },
    {
      category: "Online Safety Resources",
      icon: <Globe className="w-6 h-6 text-teal-400" />,
      resources: [
        {
          name: "Internet Crime Complaint Center (IC3)",
          contact: "ic3.gov",
          hours: "Online Resource",
          description: "Report internet-facilitated criminal activity"
        },
        {
          name: "CyberTipline",
          contact: "1-800-843-5678",
          hours: "24/7",
          description: "Report online exploitation of children"
        }
      ]
    }
  ];

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
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <AlertCircle className="w-10 h-10 text-teal-400 mr-3 animate-pulse" />
                <h1 className="text-3xl font-bold text-white">Emergency Contacts & Resources</h1>
              </div>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Immediate help is available. These verified resources are here to support you through any crisis or concern.
              </p>
            </div>

            {/* Emergency Notice */}
            <div className="bg-red-500/20 p-6 rounded-lg mb-8">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-red-400 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">In Immediate Danger?</h2>
                  <p className="text-gray-300">
                    If you're in immediate danger or facing a life-threatening emergency, 
                    call your local emergency services immediately:
                    <span className="block mt-2 text-xl font-bold text-white">911 (United States)</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Resources Grid */}
            <div className="space-y-8">
              {emergencyResources.map((section, index) => (
                <div key={index} className="bg-slate-700/30 p-6 rounded-lg animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center mb-6">
                    {section.icon}
                    <h2 className="text-xl font-semibold text-white ml-3">{section.category}</h2>
                  </div>
                  <div className="grid gap-6">
                    {section.resources.map((resource, resourceIndex) => (
                      <div key={resourceIndex} className="bg-slate-800/50 p-4 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-white mb-1">{resource.name}</h3>
                            <p className="text-teal-400 font-mono text-lg mb-2">{resource.contact}</p>
                            <p className="text-gray-300 text-sm">{resource.description}</p>
                          </div>
                          <div className="flex items-center text-gray-400 text-sm">
                            <Clock className="w-4 h-4 mr-1" />
                            {resource.hours}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Support */}
            <div className="mt-12 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <Headphones className="w-5 h-5 mr-2" />
                    Need Someone to Talk To?
                  </h2>
                  <p className="text-gray-300">
                    Our AI support is available 24/7 for immediate assistance
                  </p>
                </div>
                <Link
                  to="/peace"
                  className="bg-teal-400 hover:bg-teal-500 text-white px-6 py-3 rounded-lg transition-colors flex items-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmergencyContacts;