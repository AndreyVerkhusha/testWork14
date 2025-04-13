import React, { memo } from 'react';
import { FaTrash } from 'react-icons/fa';

import { Location } from '@/types/location';

import styles from './LocationButton.module.scss';

type LocationButtonProps = {
  location: Location;
  onClick: (lat: number, lon: number) => void;
  onRemoveFavorite?: (location: Location) => void;
};

const LocationButton: React.FC<LocationButtonProps> = memo(
  ({ location, onClick, onRemoveFavorite }) => {
    const handleRemoveFavorite = (e: React.MouseEvent) => {
      e.stopPropagation();

      onRemoveFavorite?.(location);
    };

    return (
      <div
        className={`${styles.cursorPointer} list-group-item d-flex justify-content-between align-items-center`}
        onClick={() => onClick(location.lat, location.lon)}
      >
        <div className={styles.locationButton}>
          <span>
            {location?.local_names?.ru ?? location.name}, {location.country}
          </span>
          <span className="text-muted">
            Гео координаты: [{location.lat}, {location.lon}]
          </span>
        </div>
        {onRemoveFavorite && (
          <button
            className="btn btn-danger btn-sm ms-2"
            onClick={handleRemoveFavorite}
          >
            <FaTrash />
          </button>
        )}
      </div>
    );
  },
);

export default LocationButton;

LocationButton.displayName = 'LocationButton';
