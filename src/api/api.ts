import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const limitLocationsCount = 5;
const limitForecastCount = 10;

export const fetchLocationData = async (city: string) => {
  const response = await axios.get(`${baseUrl}/geo/1.0/direct`, {
    params: {
      q: city,
      lang: 'ru',
      units: 'metric',
      limit: limitLocationsCount,
      appid: apiKey,
    },
  });

  return response.data;
};

export const fetchWeatherData = async (lat: string, lon: string) => {
  const response = await axios.get(`${baseUrl}/data/2.5/forecast`, {
    params: {
      lat: lat,
      lon,
      cnt: limitForecastCount,
      lang: 'ru',
      units: 'metric',
      appid: apiKey,
    },
  });

  return response.data;
};
