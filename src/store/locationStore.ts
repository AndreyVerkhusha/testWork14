import { create } from 'zustand';
import { Location } from '@/types/location';

type LocationStore = {
  locationList: Location[] | null;
  setLocationList: (locations: Location[] | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useLocationStore = create<LocationStore>(set => ({
  locationList: null,
  setLocationList: locations => set({ locationList: locations }),
  error: null,
  setError: error => set({ error }),
  loading: false,
  setLoading: loading => set({ loading }),
}));
