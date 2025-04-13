import { create } from 'zustand';

import { WeatherResponse } from '@/types/weather';

type WeatherStore = {
  weatherData: WeatherResponse | null;
  setWeatherData: (data: WeatherResponse | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useWeatherStore = create<WeatherStore>(set => ({
  weatherData: null,
  setWeatherData: data => set({ weatherData: data }),
  error: null,
  setError: error => set({ error }),
  loading: false,
  setLoading: loading => set({ loading }),
}));
