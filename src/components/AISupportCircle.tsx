import React, { useState, useEffect } from 'react';
import { Users, Brain, Heart, Shield, Star, Clock } from 'lucide-react';
import { CohereClient } from 'cohere-ai';
import { API_CONFIG } from '../lib/config';
import { Link } from 'react-router-dom';

const cohere = new CohereClient({
  token: API_CONFIG.cohere.apiKey,
});

interface SupportGroup {
  id: string;
  name: string;
  focus: string;
  members: number;
  activeNow: number;
  nextSession: string;
  matchScore: number;
  topics: string[];
  link: string;
}

interface AISupportCircleProps {
  userNeeds?: string;
}

const AISupportCircle: React.FC<AISupportCircleProps> = ({ userNeeds }) => {
  const [groups, setGroups] = useState<SupportGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [aiInsight, setAiInsight] = useState<string>('');

  useEffect(() => {
    const findSupportGroups = async () => {
      try {
        const response = await cohere.generate({
          prompt: `
            Generate 3 support groups for someone dealing with:
            ${userNeeds || 'online harassment and digital well-being'}

            Format as JSON array:
            [
              {
                "id": "unique-id",
                "name": "Group Name",
                "focus": "Main focus area",
                "members": number,
                "activeNow": number,
                "nextSession": "date/time",
                "matchScore": number (0-100),
                "topics": ["topic1", "topic2", "topic3"],
                "link": "route-path"
              }
            ]

            Rules:
            1. Groups must focus on digital well-being
            2. Include mix of sizes (small, medium, large)
            3. Realistic member counts
            4. Current time-appropriate next sessions
            5. Relevant topics for each group
            6. Links should be one of: "/guide/cyberbullying", "/guide/digital-wellbeing", "/emergency-contacts"

            Return ONLY the JSON array.
          `,
          model: 'command',
          maxTokens: 500,
          temperature: 0.7,
        });

        const generatedGroups = JSON.parse(response.generations[0].text.trim());
        setGroups(generatedGroups);
        setLoading(false);
      } catch (error) {
        console.error('Error finding support groups:', error);
        // Fallback groups if AI fails
        setGroups([
          {
            id: 'dw-1',
            name: 'Digital Wellness Circle',
            focus: 'Social Media Balance & Mental Health',
            members: 45,
            activeNow: 12,
            nextSession: 'Today at 3 PM',
            matchScore: 95,
            topics: ['Social Media Anxiety', 'Digital Boundaries', 'Online Self-Care'],
            link: '/guide/digital-wellbeing'
          },
          {
            id: 'ch-1',
            name: 'Cyber Healing Hub',
            focus: 'Recovery from Online Harassment',
            members: 78,
            activeNow: 23,
            nextSession: 'Tomorrow at 2 PM',
            matchScore: 88,
            topics: ['Cyberbullying Support', 'Digital Safety', 'Emotional Recovery'],
            link: '/guide/cyberbullying'
          },
          {
            id: 'dp-1',
            name: 'Digital Peace Community',
            focus: 'Mindful Technology Use',
            members: 134,
            activeNow: 45,
            nextSession: 'Today at 7 PM',
            matchScore: 82,
            topics: ['Tech-Life Balance', 'Digital Mindfulness', 'Online Community'],
            link: '/emergency-contacts'
          }
        ]);
        setLoading(false);
      }
    };

    findSupportGroups();
  }, [userNeeds]);

  const handleGroupSelect = async (groupId: string) => {
    setSelectedGroup(groupId);
    
    try {
      const response = await cohere.generate({
        prompt: `
          Generate a personalized insight for joining this support group.
          Group: ${groups.find(g => g.id === groupId)?.name}
          Focus: ${groups.find(g => g.id === groupId)?.focus}

          Rules:
          1. Keep it encouraging and warm
          2. Highlight potential benefits
          3. One sentence only
          4. Max 20 words

          Return ONLY the insight text.
        `,
        model: 'command',
        maxTokens: 50,
        temperature: 0.7,
      });

      setAiInsight(response.generations[0].text.trim());
    } catch (error) {
      console.error('Error generating insight:', error);
      setAiInsight('This group aligns well with your journey toward digital well-being.');
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl animate-fadeIn">
      <div className="flex items-center mb-6">
        <Users className="w-8 h-8 text-teal-400 mr-3" />
        <h2 className="text-2xl font-bold text-white">AI Support Circle</h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* AI Matching Status */}
          <div className="bg-slate-700/30 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="w-5 h-5 text-teal-400 mr-2" />
              <span className="text-white">AI Matching Active</span>
            </div>
            <div className="text-teal-400 text-sm">
              {groups.length} groups found
            </div>
          </div>

          {/* Group List */}
          <div className="space-y-4">
            {groups.map((group) => (
              <div
                key={group.id}
                className={`bg-slate-700/30 p-4 rounded-lg transition-all ${
                  selectedGroup === group.id ? 'ring-2 ring-teal-400' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{group.name}</h3>
                    <p className="text-gray-300 text-sm">{group.focus}</p>
                  </div>
                  <div className="flex items-center bg-teal-400/10 px-2 py-1 rounded">
                    <Star className="w-4 h-4 text-teal-400 mr-1" />
                    <span className="text-teal-400 text-sm">{group.matchScore}% Match</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="flex items-center text-gray-300 text-sm">
                    <Users className="w-4 h-4 text-teal-400 mr-2" />
                    {group.members} members ({group.activeNow} active)
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Clock className="w-4 h-4 text-teal-400 mr-2" />
                    {group.nextSession}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {group.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="bg-slate-600/50 text-gray-300 text-xs px-2 py-1 rounded"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleGroupSelect(group.id)}
                    className="text-teal-400 hover:text-teal-300 text-sm"
                  >
                    View Details
                  </button>
                  <Link
                    to={group.link}
                    className="bg-teal-400 hover:bg-teal-500 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center"
                  >
                    Learn More
                  </Link>
                </div>

                {selectedGroup === group.id && aiInsight && (
                  <div className="mt-3 bg-slate-600/30 p-3 rounded-lg flex items-start">
                    <Brain className="w-4 h-4 text-teal-400 mr-2 mt-1 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">{aiInsight}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Support Note */}
          <div className="bg-gradient-to-r from-teal-500/20 to-emerald-500/20 p-4 rounded-lg">
            <div className="flex items-center">
              <Heart className="w-5 h-5 text-teal-400 mr-2" />
              <p className="text-gray-300 text-sm">
                All groups are moderated and follow strict safety guidelines to ensure a supportive environment.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AISupportCircle;