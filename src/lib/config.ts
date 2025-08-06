export const API_CONFIG = {
  cohere: {
    apiKey: import.meta.env.VITE_COHERE_API_KEY || '',
    model: 'command',
    maxTokens: 100
  },
  googleMaps: {
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    region: 'us'
  }
};

export function validateConfig() {
  const missingVars = [];
  
  if (!API_CONFIG.cohere.apiKey) {
    missingVars.push('VITE_COHERE_API_KEY');
  }
  if (!API_CONFIG.googleMaps.apiKey) {
    missingVars.push('VITE_GOOGLE_MAPS_API_KEY');
  }
  
  if (missingVars.length > 0) {
    console.warn(`Missing environment variables: ${missingVars.join(', ')}`);
    return false;
  }
  
  return true;
}