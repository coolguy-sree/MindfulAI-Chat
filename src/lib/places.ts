import { TherapistProfile } from '../types';
import { API_CONFIG } from './config';
import { mockTherapists } from './mockData';

export async function testGoogleMapsAPI(): Promise<boolean> {
  if (!API_CONFIG.googleMaps.apiKey) {
    console.warn('Google Maps API key not configured');
    return false;
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=New York, NY&key=${API_CONFIG.googleMaps.apiKey}`
    );
    const data = await response.json();
    return data.status === 'OK';
  } catch (error) {
    console.error('Google Maps API test failed:', error);
    return false;
  }
}

export async function searchTherapists(location: string): Promise<TherapistProfile[]> {
  try {
    const isApiWorking = await testGoogleMapsAPI();
    
    if (!isApiWorking) {
      console.warn('Using mock data due to API unavailability');
      return mockTherapists.map(therapist => ({
        ...therapist,
        address: therapist.address.replace(/New York, NY \d+/, location)
      }));
    }

    // Geocode the location
    const geocodeResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${API_CONFIG.googleMaps.apiKey}`
    );
    const geocodeData = await geocodeResponse.json();

    if (geocodeData.status !== 'OK') {
      throw new Error('Geocoding failed');
    }

    const { lat, lng } = geocodeData.results[0].geometry.location;

    // Search for nearby therapists
    const placesResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=doctor&keyword=therapist%20psychologist%20counselor&key=${API_CONFIG.googleMaps.apiKey}`
    );
    const placesData = await placesResponse.json();

    if (placesData.status !== 'OK') {
      throw new Error('Places search failed');
    }

    // Get details for each place
    const therapists = await Promise.all(
      placesData.results.map(async (place) => {
        const detailsResponse = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,formatted_phone_number,website,rating,reviews,opening_hours&key=${API_CONFIG.googleMaps.apiKey}`
        );
        const detailsData = await detailsResponse.json();

        if (detailsData.status !== 'OK') {
          throw new Error(`Place details failed for ${place.place_id}`);
        }

        const { result } = detailsData;

        return {
          id: place.place_id,
          name: result.name || 'Unknown Name',
          specialty: 'Mental Health Professional',
          rating: result.rating || 0,
          address: result.formatted_address || place.vicinity || '',
          phone: result.formatted_phone_number || 'No phone number available',
          website: result.website || '',
          availability: result.opening_hours?.weekday_text?.join(', ') || 'Contact for availability',
          distance: place.distance ? place.distance / 1000 : undefined,
          reviews: result.reviews?.map(review => ({
            author_name: review.author_name,
            rating: review.rating,
            text: review.text,
            time: review.time
          })) || []
        };
      })
    );

    return therapists;
  } catch (error) {
    console.error('Error searching therapists:', error);
    // Fallback to mock data on error
    return mockTherapists.map(therapist => ({
      ...therapist,
      address: therapist.address.replace(/New York, NY \d+/, location)
    }));
  }
}