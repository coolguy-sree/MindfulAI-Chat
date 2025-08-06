import { CohereClient } from 'cohere-ai';
import Sentiment from 'sentiment';
import { API_CONFIG } from './config';

const cohere = new CohereClient({
  token: API_CONFIG.cohere.apiKey,
});

const sentiment = new Sentiment();

export interface MonitoringAlert {
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'harassment' | 'cyberbullying' | 'threat' | 'hate_speech';
  confidence: number;
  timestamp: string;
  details: string;
  suggestedActions: string[];
}

interface ContentAnalysis {
  toxicity: number;
  threat_level: number;
  harassment_probability: number;
  sentiment: number;
  keywords: string[];
  context: string;
}

async function analyzeContent(content: string): Promise<ContentAnalysis | null> {
  if (!content) {
    return null;
  }

  try {
    const sentimentResult = sentiment.analyze(content);
    const normalizedSentiment = (sentimentResult.score + 5) / 10;

    const cohereResponse = await cohere.generate({
      prompt: `
        Analyze this content for signs of digital harassment, cyberbullying, or online threats.
        Content: "${content}"
        
        Provide a detailed analysis focusing on:
        1. Threat level assessment
        2. Harassment indicators
        3. Key concerning phrases
        4. Context and intent analysis
        
        Format as JSON with these fields:
        {
          "toxicity": number (0-1),
          "threat_level": number (0-1),
          "harassment_probability": number (0-1),
          "keywords": string[],
          "context": string
        }
      `,
      model: 'command',
      maxTokens: 500,
      temperature: 0.2,
    });

    const cohereAnalysis = JSON.parse(cohereResponse.generations[0].text.trim());

    return {
      ...cohereAnalysis,
      sentiment: normalizedSentiment
    };
  } catch (error) {
    console.error('Error in AI content analysis:', error);
    return null;
  }
}

export async function monitorContent(
  content: string,
  context: string = 'general'
): Promise<MonitoringAlert | null> {
  if (!content) {
    return null;
  }

  try {
    const analysis = await analyzeContent(content);
    
    if (!analysis) {
      return null;
    }

    let severity: MonitoringAlert['severity'] = 'low';
    const riskScore = (
      analysis.toxicity * 0.3 +
      analysis.threat_level * 0.4 +
      analysis.harassment_probability * 0.3
    );

    if (riskScore > 0.8) {
      severity = 'critical';
    } else if (riskScore > 0.6) {
      severity = 'high';
    } else if (riskScore > 0.4) {
      severity = 'medium';
    }

    let type: MonitoringAlert['type'] = 'harassment';
    if (analysis.threat_level > 0.7) {
      type = 'threat';
    } else if (analysis.keywords.some(k => k.includes('hate') || k.includes('discriminat'))) {
      type = 'hate_speech';
    } else if (analysis.context.toLowerCase().includes('bully')) {
      type = 'cyberbullying';
    }

    const suggestedActions = await generateActionRecommendations(severity, type, analysis);

    return {
      severity,
      type,
      confidence: riskScore,
      timestamp: new Date().toISOString(),
      details: analysis.context,
      suggestedActions
    };
  } catch (error) {
    console.error('Error in AI monitoring:', error);
    return null;
  }
}

async function generateActionRecommendations(
  severity: MonitoringAlert['severity'],
  type: MonitoringAlert['type'],
  analysis: ContentAnalysis
): Promise<string[]> {
  try {
    const response = await cohere.generate({
      prompt: `
        Given this content analysis:
        - Severity: ${severity}
        - Type: ${type}
        - Toxicity: ${analysis.toxicity}
        - Threat Level: ${analysis.threat_level}
        - Context: ${analysis.context}

        Generate specific, actionable recommendations for handling this situation.
        Focus on immediate safety, documentation, and support resources.
        Return as a JSON array of strings, maximum 5 recommendations.
      `,
      model: 'command',
      maxTokens: 200,
      temperature: 0.3,
    });

    return JSON.parse(response.generations[0].text.trim());
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return [
      'Document the incident',
      'Update security settings',
      'Contact support if needed'
    ];
  }
}

export async function getHistoricalPatterns(
  alerts: MonitoringAlert[],
  timeframe: 'day' | 'week' | 'month' = 'week'
): Promise<any> {
  if (!alerts || alerts.length === 0) {
    return {
      patterns: [],
      riskLevel: 'low',
      recommendations: [],
      urgentActions: []
    };
  }

  try {
    const response = await cohere.generate({
      prompt: `
        Analyze these alert patterns:
        ${JSON.stringify(alerts)}
        Timeframe: ${timeframe}

        Generate insights about:
        1. Frequency patterns
        2. Escalation trends
        3. Risk assessment
        4. Recommended actions

        Return as JSON with:
        {
          "patterns": string[],
          "riskLevel": "low" | "medium" | "high",
          "recommendations": string[],
          "urgentActions": string[]
        }
      `,
      model: 'command',
      maxTokens: 500,
      temperature: 0.3,
    });

    return JSON.parse(response.generations[0].text.trim());
  } catch (error) {
    console.error('Error in pattern analysis:', error);
    throw error;
  }
}