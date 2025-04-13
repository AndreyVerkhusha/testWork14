import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';

import { Location } from '@/types/location';

type FavoriteStore = {
  favorites: Location[];
  addFavorite: (location: Location) => void;
  removeFavorite: (location: Location) => void;
};

const storage: PersistStorage<FavoriteStore> = {
  getItem: key => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  removeItem: key => localStorage.removeItem(key),
};

const useFavoriteStore = create<FavoriteStore>()(
  persist(
    set => ({
      favorites: [],
      addFavorite: (location: Location) =>
        set((state: FavoriteStore) => ({
          favorites: [...state.favorites, location],
        })),
      removeFavorite: (location: Location) =>
        set((state: FavoriteStore) => ({
          favorites: state.favorites.filter(
            (fav: Location) => fav.name !== location.name,
          ),
        })),
    }),
    {
      name: 'favorite-locations',
      storage,
    },
  ),
);

export default useFavoriteStore;
