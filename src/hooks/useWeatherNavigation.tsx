import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const useWeatherNavigation = () => {
  const router = useRouter();

  const handleOpenWeatherCard = useCallback(
    (lat: number, lon: number) => {
      router.push(`/forecast/${lat}/${lon}`);
    },
    [router],
  );

  return { handleOpenWeatherCard };
};

export default useWeatherNavigation;
