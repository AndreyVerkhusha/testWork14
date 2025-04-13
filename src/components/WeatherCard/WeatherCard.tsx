import React, { memo, useMemo, useState } from 'react';
import cn from 'classnames';
import dayjs from 'dayjs';
import { FaStar, FaRegStar } from 'react-icons/fa';

import { Location } from '@/types/location';
import { WeatherResponse } from '@/types/weather';
import useFavoriteStore from '@/store/favoriteStore';

import styles from './WeatherCard.module.scss';

const dateTimeFormat = 'DD.MM.YY HH:mm';
const shortTimeFormat = 'HH:mm';

const WeatherCard = memo(
  ({ weatherData }: { weatherData: WeatherResponse }) => {
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const { favorites, addFavorite, removeFavorite } = useFavoriteStore();

    const today = dayjs();
    const tomorrow = today.add(1, 'day');

    const todayForecast = useMemo(() => {
      return weatherData.list.filter(item => {
        const date = dayjs(item.dt_txt);
        return date.isSame(today, 'day');
      });
    }, [weatherData.list, today]);

    const tomorrowForecast = useMemo(() => {
      return weatherData.list.filter(item => {
        const date = dayjs(item.dt_txt);
        return date.isSame(tomorrow, 'day');
      });
    }, [weatherData.list, tomorrow]);

    const isFavorite = favorites.some(
      (fav: Location) => fav.name === weatherData.city.name,
    );

    const handleIndexChange = (index: number) => {
      setSelectedIndex(index);
    };

    const handleDayChange = (day: number) => {
      setSelectedDay(day);
      setSelectedIndex(0);
    };

    const toggleFavorite = () => {
      const location: Location = {
        name: weatherData.city.name,
        lat: weatherData.city.coord.lat,
        lon: weatherData.city.coord.lon,
        country: weatherData.city.country,
      };

      if (isFavorite) {
        removeFavorite(location);
      } else {
        addFavorite(location);
      }
    };

    const forecast = selectedDay === 0 ? todayForecast : tomorrowForecast;

    return (
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h5 className="m-0">
            {weatherData.city.name}, {weatherData.city.country}
          </h5>
          <span className="text-muted">
            Гео координаты: [{weatherData.city.coord.lat},{' '}
            {weatherData.city.coord.lon}]
          </span>
          <button onClick={toggleFavorite} className={styles.favoriteButton}>
            {isFavorite ? <FaStar color="gold" /> : <FaRegStar />}
          </button>
        </div>
        <div className={styles.cardBody}>
          <h6>
            {selectedDay === 0 ? 'Сегодня' : 'Завтра'}:{' '}
            {dayjs(forecast[selectedIndex].dt_txt).format(dateTimeFormat)}
          </h6>
          <p>Температура: {forecast[selectedIndex].main.temp}°C</p>
          <p>Ощущается как: {forecast[selectedIndex].main.feels_like}°C</p>
          <p>Влажность: {forecast[selectedIndex].main.humidity}%</p>
          <p>Облачность: {forecast[selectedIndex].clouds.all}%</p>
          <p>Вероятность осадков: {forecast[selectedIndex].pop * 100}%</p>
          <p>
            Погодные условия: {forecast[selectedIndex].weather[0].description}
          </p>
        </div>
        <div className={styles.cardFooter}>
          <button
            className={cn(styles.btn, {
              [styles.btnPrimary]: selectedDay === 0,
              [styles.btnSecondary]: selectedDay !== 0,
            })}
            onClick={() => handleDayChange(0)}
          >
            Сегодня
          </button>
          <button
            className={cn(styles.btn, {
              [styles.btnPrimary]: selectedDay === 1,
              [styles.btnSecondary]: selectedDay !== 1,
            })}
            onClick={() => handleDayChange(1)}
          >
            Завтра
          </button>
          {forecast.map((item, index) => (
            <button
              key={index}
              className={cn(styles.btn, {
                [styles.btnPrimary]: selectedIndex === index,
                [styles.btnSecondary]: selectedIndex !== index,
              })}
              onClick={() => handleIndexChange(index)}
            >
              {dayjs(item.dt_txt).format(shortTimeFormat)}
            </button>
          ))}
        </div>
      </div>
    );
  },
);

export default WeatherCard;

WeatherCard.displayName = 'WeatherCard';
