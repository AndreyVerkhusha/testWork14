export type Location = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  local_names?: {
    [K in 'ru' | 'en']?: string;
  };
};
