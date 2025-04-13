'use client';
import React, { useState } from 'react';
import axios from 'axios';

import { useLocationStore } from '@/store/locationStore';
import { fetchLocationData } from '@/api/api';

const SearchBar = () => {
  const [inputCity, setInputCity] = useState('');

  const { setLocationList, setError, setLoading, loading } = useLocationStore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inputCity && !loading) {
      setLoading(true);
      try {
        const response = await fetchLocationData(inputCity);

        setLocationList(response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError('Ошибка при получении данных о местоположении.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className="d-flex justify-content-center">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Введите город"
        value={inputCity}
        onChange={e => setInputCity(e.target.value)}
      />
      <button type="submit" disabled={!inputCity} className="btn btn-primary">
        Поиск
      </button>
    </form>
  );
};

export default SearchBar;
