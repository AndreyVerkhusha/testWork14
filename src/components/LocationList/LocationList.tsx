'use client';
import React, { useEffect } from 'react';

import { useLocationStore } from '@/store/locationStore';
import Spinner from '@/components/Spinner/Spinner';
import LocationButton from '@/components/LocationButton';
import useWeatherNavigation from '@/hooks/useWeatherNavigation';

const LocationList = () => {
  const { locationList, setLocationList, error, loading, setError } =
    useLocationStore();
  const { handleOpenWeatherCard } = useWeatherNavigation();

  const fetchCitiesIsEmpty = locationList !== null && locationList.length === 0;

  useEffect(() => {
    return () => {
      setLocationList(null);
      setError(null);
    };
  }, [setError, setLocationList]);

  return (
    <div className="container mt-4 p-0">
      {loading && <Spinner top={200} />}

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {!loading && !error && locationList && locationList.length > 0 && (
        <div className="list-group">
          {locationList.map(location => (
            <LocationButton
              key={location.name}
              location={location}
              onClick={handleOpenWeatherCard}
            />
          ))}
        </div>
      )}

      {!loading && fetchCitiesIsEmpty && (
        <div className="alert alert-warning text-center">
          Города с таким названием не найдено.
        </div>
      )}
    </div>
  );
};

export default LocationList;
