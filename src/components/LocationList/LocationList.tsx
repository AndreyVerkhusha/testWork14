'use client';
import React, { useEffect } from 'react';
import { useLocationStore } from '@/store/locationStore';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Spinner/Spinner';

const LocationList = () => {
  const { locationList, setLocationList, error, loading, setError } =
    useLocationStore();
  const router = useRouter();

  const fetchCitiesIsEmpty = locationList !== null && locationList.length === 0;

  const handleOpenWeatherCard = (lat: number, lon: number) => {
    router.push(`/forecast/${lat}/${lon}`);
  };

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
          {locationList.map((location, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleOpenWeatherCard(location.lat, location.lon)}
              className="list-group-item list-group-item-action d-flex justify-content-between flex-wrap gap-3"
            >
              <span>
                {location?.local_names?.ru ?? location.name}, {location.country}
              </span>
              <span className="text-muted">
                Гео координаты: [{location.lat}, {location.lon}]
              </span>
            </button>
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
