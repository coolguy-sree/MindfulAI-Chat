import OpenAI from 'openai';
import { TherapistProfile } from '../types';
import { API_CONFIG } from './config';

const openai = new OpenAI({
  apiKey: API_CONFIG.openai.apiKey,
  dangerouslyAllowBrowser: true
});

export async function testOpenAIAPI(): Promise<boolean> {
  if (!API_CONFIG.openai.apiKey) {
    console.warn('OpenAI API key not configured');
    return false;
  }

  try {
    const testCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: 'Test' }],
      model: API_CONFIG.openai.model,
    });

    return !!testCompletion.choices[0].message;
  } catch (error) {
    console.error('OpenAI API test failed:', error);
    return false;
  }
}

function basicTherapistRanking(
  userNeeds: string,
  therapists: TherapistProfile[]
): TherapistProfile[] {
  const needsLower = userNeeds.toLowerCase();
  const keywords = needsLower.split(/\s+/);

  return [...therapists].sort((a, b) => {
    const aRelevance = keywords.reduce((score, keyword) => {
      return score + (
        (a.specialty.toLowerCase().includes(keyword) ? 2 : 0) +
        (a.reviews?.some(r => r.text.toLowerCase().includes(keyword)) ? 1 : 0)
      );
    }, 0);

    const bRelevance = keywords.reduce((score, keyword) => {
      return score + (
        (b.specialty.toLowerCase().includes(keyword) ? 2 : 0) +
        (b.reviews?.some(r => r.text.toLowerCase().includes(keyword)) ? 1 : 0)
      );
    }, 0);

    // If relevance scores are equal, sort by rating and distance
    if (aRelevance === bRelevance) {
      const aScore = a.rating - (a.distance || 0) * 0.1;
      const bScore = b.rating - (b.distance || 0) * 0.1;
      return bScore - aScore;
    }

    return bRelevance - aRelevance;
  });
}

export async function getAIRecommendations(
  userNeeds: string,
  location: string,
  therapists: TherapistProfile[]
): Promise<TherapistProfile[]> {
  try {
    const isApiWorking = await testOpenAIAPI();
    if (!isApiWorking) {
      console.warn('Using basic ranking due to OpenAI API unavailability');
      return basicTherapistRanking(userNeeds, therapists);
    }

    const prompt = `
      Given a user looking for mental health support with the following needs:
      "${userNeeds}"
      
      And their location: "${location}"
      
      Please analyze these therapist profiles and rank them based on their suitability:
      ${JSON.stringify(therapists, null, 2)}
      
      Consider factors like:
      - Specialty match with user needs
      - Location accessibility
      - Experience and ratings
      - Availability
      
      Return only the therapist IDs in order of best match, as a comma-separated list.
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: API_CONFIG.openai.model,
      max_tokens: API_CONFIG.openai.maxTokens,
    });

    const rankedIds = completion.choices[0].message.content?.split(',').map(id => id.trim()) || [];
    
    // Sort therapists based on AI ranking
    const rankedTherapists = therapists.sort((a, b) => {
      const aIndex = rankedIds.indexOf(a.id);
      const bIndex = rankedIds.indexOf(b.id);
      return aIndex - bIndex;
    });

    return rankedTherapists;
  } catch (error) {
    console.error('Error getting AI recommendations:', error);
    return basicTherapistRanking(userNeeds, therapists);
  }
}