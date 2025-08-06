import React, { useState, useRef, useEffect } from 'react';
import { Send, Brain, Shield, AlertTriangle } from 'lucide-react';
import { CohereClient } from 'cohere-ai';
import { API_CONFIG } from '../lib/config';

const cohere = new CohereClient({
  token: API_CONFIG.cohere.apiKey,
});

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isEmergency?: boolean;
}

interface AIChatProps {
  onEmergencyDetected?: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ onEmergencyDetected }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'ai',
      content: "Hi! I'm here to help with online harassment and digital well-being. What's on your mind?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [emergencyDetected, setEmergencyDetected] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await cohere.generate({
        prompt: `
          You are a supportive AI assistant helping with social media harassment and digital wellbeing.
          Keep responses short (max 2-3 sentences) and action-focused.

          Context:
          ${messages.slice(-2).map(m => `${m.type}: ${m.content}`).join('\n')}

          User: ${userMessage}

          Rules:
          1. Be direct and concise
          2. Focus on immediate, practical steps
          3. Keep emotional support brief but genuine
          4. Prioritize safety and well-being
          5. Max 50 words per response

          Assistant:`,
        model: 'command',
        maxTokens: 100,
        temperature: 0.7,
      });

      return response.generations[0].text.trim();
    } catch (error) {
      console.error('Error generating AI response:', error);
      return "I'm having trouble right now. Please try again or check our emergency contacts if you need immediate help.";
    }
  };

  const checkEmergency = async (message: string): Promise<boolean> => {
    try {
      const response = await cohere.generate({
        prompt: `
          Check if this message indicates an emergency:
          "${message}"

          Return ONLY "true" for:
          - Immediate danger
          - Severe harassment
          - Urgent threats
          - Crisis situation

          Return "false" otherwise.
          
          Response:`,
        model: 'command',
        maxTokens: 5,
        temperature: 0.1,
      });

      return response.generations[0].text.trim().toLowerCase() === 'true';
    } catch (error) {
      console.error('Error checking emergency:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    const isEmergency = await checkEmergency(userMessage.content);
    if (isEmergency && !emergencyDetected) {
      setEmergencyDetected(true);
      onEmergencyDetected?.();
    }

    const aiResponse = await generateAIResponse(userMessage.content);
    
    const aiMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: aiResponse,
      timestamp: new Date(),
      isEmergency
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 animate-fadeIn">
      <div className="flex items-center mb-6">
        <Brain className="w-8 h-8 text-teal-400 mr-2" />
        <h2 className="text-2xl font-bold text-white">AI Support Chat</h2>
      </div>

      <div className="h-[500px] flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${
                message.type === 'user'
                  ? 'ml-auto bg-teal-400/10 text-white'
                  : 'bg-slate-700/50 text-gray-200'
              } p-4 rounded-lg max-w-[80%] relative`}
            >
              {message.isEmergency && (
                <div className="absolute -left-2 top-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                </div>
              )}
              <div className="flex items-start">
                {message.type === 'ai' && (
                  <Shield className="w-5 h-5 text-teal-400 mr-2 mt-1 flex-shrink-0" />
                )}
                <div>
                  <p className="break-words">{message.content}</p>
                  <span className="text-xs text-gray-400 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="bg-slate-700/50 p-4 rounded-lg max-w-[80%]">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 bg-slate-700/50 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            disabled={isTyping}
          />
          <button
            type="submit"
            className="bg-teal-400 hover:bg-teal-500 disabled:bg-teal-400/50 text-white p-2 rounded-lg transition-colors"
            disabled={isTyping || !inputMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChat;