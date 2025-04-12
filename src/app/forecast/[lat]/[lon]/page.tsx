'use client';
import React, { useCallback, useEffect } from 'react';
import { useWeatherStore } from '@/store/weatherStore';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Spinner from '@/components/Spinner/Spinner';
import { fetchWeatherData } from '@/api/api';
import WeatherCard from '@/components/WeatherCard';

const ForecastPage = () => {
  const { weatherData, error, setError, setWeatherData, setLoading, loading } =
    useWeatherStore();
  const { lat, lon } = useParams<{ lat?: string; lon?: string }>();

  const getWeatherData = useCallback(async () => {
    if (lat && lon) {
      setLoading(true);

      try {
        const response = await fetchWeatherData(lat, lon);
        setWeatherData(response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError('Ошибка при получении данных о погоде.');
        }
      } finally {
        setLoading(false);
      }
    }
  }, [lat, lon, setError, setLoading, setWeatherData]);

  useEffect(() => {
    getWeatherData();

    return () => {
      setError(null);
      setWeatherData(null);
    };
  }, [getWeatherData, lat, lon, setError, setWeatherData]);

  return (
    <div className="container mt-5">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          {weatherData && <WeatherCard weatherData={weatherData} />}
        </>
      )}
    </div>
  );
};

export default ForecastPage;
