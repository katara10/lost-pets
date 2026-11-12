import { useState, useEffect, useMemo } from 'react';
import { Typography } from '@mui/material';
import { AdList } from '../../entities/ad/AdList';
import { Loader } from '../../shared/ui/Loader/Loader';
import { EmptyState } from '../../shared/ui/EmptyState/EmptyState';
import { AdFilters } from '../../features/ad-filters/AdFilters';
import type { Ad, AdFilters as AdFiltersType } from '../../entities/ad/types';

const localMockAds: Ad[] = [
  {
    id: '1',
    type: 'lost',
    species: 'Кошка',
    name: 'Мурка',
    description: 'Пушистая, серая, зеленые глаза. Очень ласковая, но пугливая.',
    location: 'Москва, район Хамовники',
    date: '2026-10-01',
    status: 'active',
    photos: ['/cat.jpg'],
    contacts: { phone: '+7 (999) 123-45-67', name: 'Анна' },
  },
  {
    id: '2',
    type: 'found',
    species: 'Собака',
    name: 'Неизвестный пёс',
    description: 'Найден рыжий спаниель возле метро. Ухоженный, знает команду "сидеть".',
    location: 'Санкт-Петербург, ст. м. Площадь Восстания',
    date: '2026-10-03',
    status: 'active',
    photos: ['/dog.jpg'],
    contacts: { phone: '+7 (911) 222-33-44', name: 'Игорь' },
  },
  {
    id: '3',
    type: 'lost',
    species: 'Попугай',
    name: 'Кеша',
    description: 'Зеленый волнистый попугай. Умеет говорить "Кеша хороший".',
    location: 'Екатеринбург, Академический район',
    date: '2026-10-05',
    status: 'found',
    photos: ['/parrot.jpg'],
    contacts: { phone: '+7 (900) 555-66-77', name: 'Елена' },
  },
];

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ads, setAds] = useState<Ad[]>([]);

  const [filters, setFilters] = useState<AdFiltersType>({ 
    type: 'all', 
    species: 'all' 
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAds(localMockAds);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredAds = useMemo(() => {
    return ads.filter((ad) => {
      if (filters.type !== 'all' && ad.type !== filters.type) return false;
      if (filters.species !== 'all' && ad.species !== filters.species) return false;
      return true;
    });
  }, [ads, filters]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Потерянные и найденные животные
      </Typography>

      <AdFilters filters={filters} onChange={setFilters} />

      {filteredAds.length === 0 ? (
        <EmptyState message="По вашему запросу ничего не найдено. Попробуйте изменить фильтры." />
      ) : (
        <AdList ads={filteredAds} />
      )}
    </div>
  );
};