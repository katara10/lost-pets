import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { AdList } from '../../entities/ad/AdList';
import { Loader } from '../../shared/ui/Loader/Loader';
import { EmptyState } from '../../shared/ui/EmptyState/EmptyState';
import type { Ad } from '../../entities/ad/types';

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
    photos: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400&auto=format&fit=crop'],
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
    photos: ['https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=400&auto=format&fit=crop'],
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
    photos: ['https://images.unsplash.com/photo-1552728089-57bdde30beb3?q=80&w=400&auto=format&fit=crop'],
    contacts: { phone: '+7 (900) 555-66-77', name: 'Елена' },
  },
];

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    // Имитация загрузки данных
    const timer = setTimeout(() => {
      setAds(localMockAds);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loader />;
  if (ads.length === 0) return <EmptyState message="Объявлений пока нет" />;

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Потерянные и найденные животные
      </Typography>
      <AdList ads={ads} />
    </div>
  );
};