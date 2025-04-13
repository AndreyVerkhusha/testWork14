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
  // запрос города по широте (lat) и долготе (lon) не всегда корректный результат возвращает.
  // Например lat и lon Санкт Петербурга опознаются как Новая Голландия.

  // В api openweathermap есть возможность найти погоду только по названию города, через url "/data/2.5/forecast/hourly?",
  // но этот доступ не в рамках бесплатной подписки.

  const response = await axios.get(`${baseUrl}/data/2.5/forecast`, {
    params: {
      lat,
      lon,
      cnt: limitForecastCount,
      lang: 'ru',
      units: 'metric',
      appid: apiKey,
    },
  });

  return response.data;
};
