'use client';
import React, { useCallback } from 'react';

import { Location } from '@/types/location';
import useFavoriteStore from '@/store/favoriteStore';
import LocationButton from '@/components/LocationButton';
import useWeatherNavigation from '@/hooks/useWeatherNavigation';

const FavoritePage = () => {
  const { favorites, removeFavorite } = useFavoriteStore();
  const { handleOpenWeatherCard } = useWeatherNavigation();

  const handleRemoveFavorite = useCallback(
    (location: Location) => {
      removeFavorite(location);
    },
    [removeFavorite],
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Избранные города</h2>
      {favorites.length === 0 ? (
        <div className="alert alert-warning text-center">
          Нет избранных городов.
        </div>
      ) : (
        <div className="list-group">
          {favorites.map(location => (
            <LocationButton
              key={location.name}
              location={location}
              onRemoveFavorite={() => handleRemoveFavorite(location)}
              onClick={handleOpenWeatherCard}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
