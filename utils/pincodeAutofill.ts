import React from "react";

export interface LocationData {
  city: string;
  state: string;
  area: string;
  country: string;
}

/**
 * Fetches location data from Indian pincode using India Post API
 * @param pincode - 6 digit Indian pincode
 * @returns Promise<LocationData | null>
 */
export const fetchLocationFromPincode = async (pincode: string): Promise<LocationData | null> => {
  // Validate pincode format
  if (!/^\d{6}$/.test(pincode)) {
    throw new Error('Invalid pincode format. Must be 6 digits.');
  }

  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice.length > 0) {
      const postOffice = data[0].PostOffice[0];
      
      return {
        city: postOffice.District || '',
        state: postOffice.State || '',
        area: postOffice.Name || '',
        country: postOffice.Country || 'India'
      };
    } else {
      return null; // Pincode not found
    }
  } catch (error) {
    console.error('Error fetching location from pincode:', error);
    throw error;
  }
};

/**
 * Validates if a pincode is in correct format
 * @param pincode - String to validate
 * @returns boolean
 */
export const isValidPincode = (pincode: string): boolean => {
  return /^\d{6}$/.test(pincode);
};

/**
 * Hook for pincode autofill functionality
 * @param onLocationUpdate - Callback when location data is fetched
 * @returns Object with loading state, error, and fetch function
 */
export const usePincodeAutofill = (
  onLocationUpdate: (location: LocationData) => void
) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string>('');

  const fetchLocation = async (pincode: string) => {
    if (!isValidPincode(pincode)) {
      setError('Please enter a valid 6-digit pincode');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const locationData = await fetchLocationFromPincode(pincode);
      
      if (locationData) {
        onLocationUpdate(locationData);
        setError('');
      } else {
        setError('Location not found for this pincode');
      }
    } catch (err) {
      setError('Unable to fetch location. Please try again.');
      console.error('Pincode autofill error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, fetchLocation };
};