import { CohereClient } from 'cohere-ai';
import { TherapistProfile } from '../types';
import { API_CONFIG } from './config';
import { mockTherapists } from './mockData';

const cohere = new CohereClient({
  token: API_CONFIG.cohere.apiKey,
});

const VERIFIED_PLATFORMS = {
  betterhelp: 'https://www.betterhelp.com',
  talkspace: 'https://www.talkspace.com',
  psychologytoday: 'https://www.psychologytoday.com/us/therapists'
};

async function testCohereAPI(): Promise<boolean> {
  if (!API_CONFIG.cohere.apiKey) {
    console.warn('Cohere API key not configured');
    return false;
  }

  try {
    await cohere.generate({
      prompt: 'Test',
      model: 'command',
      maxTokens: 5
    });
    return true;
  } catch (error) {
    console.error('Cohere API test failed:', error);
    return false;
  }
}

function sanitizeTherapistProfile(profile: any): TherapistProfile {
  let website = VERIFIED_PLATFORMS.betterhelp;
  if (profile.website) {
    const websiteLower = profile.website.toLowerCase();
    if (websiteLower.includes('talkspace')) {
      website = VERIFIED_PLATFORMS.talkspace;
    } else if (websiteLower.includes('psychologytoday')) {
      website = VERIFIED_PLATFORMS.psychologytoday;
    }
  }

  return {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: String(profile.name || 'Unknown Therapist'),
    specialty: String(profile.specialty || 'Digital Mental Health'),
    rating: Number(profile.rating) || 4.5,
    website,
    availability: String(profile.availability || 'Contact for availability'),
    credentials: Array.isArray(profile.credentials) ? profile.credentials.map(String) : [],
    aiMatchScore: Number(profile.aiMatchScore) || 85
  };
}

function extractJSONFromText(text: string): any {
  try {
    return JSON.parse(text);
  } catch (e) {
    const jsonMatch = text.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (e2) {
        console.error('JSON parsing error:', e2);
        return null;
      }
    }
    console.error('No JSON structure found in response');
    return null;
  }
}

export async function getAIRecommendations(userNeeds: string): Promise<TherapistProfile[]> {
  try {
    const isApiWorking = await testCohereAPI();
    
    if (!isApiWorking) {
      console.warn('Cohere API unavailable, using mock data');
      return mockTherapists;
    }

    const response = await cohere.generate({
      prompt: `
        You are a mental health professional matching system. Generate 3 therapist profiles specializing in:
        ${userNeeds}

        Focus ONLY on social media and online harassment issues.
        
        Requirements:
        1. Each therapist MUST specialize in:
           - Digital wellness
           - Cyberbullying recovery
           - Social media mental health
           - Online harassment trauma
        
        2. ONLY use these therapy platforms:
           - BetterHelp
           - Talkspace
           - Psychology Today
        
        3. Format as a JSON array with this EXACT structure:
        [
          {
            "name": "string",
            "specialty": "string",
            "rating": number,
            "website": "string (platform name only)",
            "availability": "string",
            "credentials": ["string"],
            "aiMatchScore": number
          }
        ]

        4. For website, ONLY use: "BetterHelp", "Talkspace", or "Psychology Today"
        5. Keep specialties focused on digital and online issues only
        6. Ratings should be between 4.5 and 5.0
        7. AI match scores should be between 85 and 100
        
        Return ONLY the JSON array, no other text.
      `,
      model: 'command',
      maxTokens: 1000,
      temperature: 0.7,
    });

    if (!response.generations || response.generations.length === 0) {
      console.warn('No generations returned from Cohere API');
      return mockTherapists;
    }

    const text = response.generations[0].text.trim();
    const profiles = extractJSONFromText(text);

    if (!profiles || !Array.isArray(profiles)) {
      console.warn('Invalid response format from Cohere API');
      return mockTherapists;
    }

    return profiles.map(sanitizeTherapistProfile);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return mockTherapists;
  }
}

export async function getProgressInsights(progressData: any) {
  try {
    const isApiWorking = await testCohereAPI();
    
    if (!isApiWorking) {
      throw new Error('API not available');
    }

    const response = await cohere.generate({
      prompt: `
        Analyze this therapy progress data and generate 4 insights:
        ${JSON.stringify(progressData, null, 2)}

        Generate insights about:
        1. Overall progress trends
        2. Areas of improvement
        3. Potential concerns
        4. Actionable suggestions

        Format as JSON array:
        [
          {
            "type": "improvement" | "warning" | "suggestion",
            "message": "Clear, specific insight"
          }
        ]

        Focus on:
        - Digital wellness
        - Online anxiety management
        - Coping strategies
        - Social media habits

        Keep messages concise and actionable.
        Return ONLY the JSON array.
      `,
      model: 'command',
      maxTokens: 500,
      temperature: 0.7,
    });

    if (!response.generations || response.generations.length === 0) {
      throw new Error('No generations returned');
    }

    const text = response.generations[0].text.trim();
    const insights = extractJSONFromText(text);

    if (!insights || !Array.isArray(insights)) {
      throw new Error('Invalid response format');
    }

    return insights.map(insight => ({
      type: String(insight.type || 'suggestion'),
      message: String(insight.message || 'No insight available')
    }));
  } catch (error) {
    console.error('Error generating insights:', error);
    throw error;
  }
}