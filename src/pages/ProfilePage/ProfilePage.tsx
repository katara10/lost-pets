import { useState } from 'react';
import { Typography, Button, Paper, Chip, Snackbar, Alert } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { EmptyState } from '../../shared/ui/EmptyState/EmptyState';
import type { Ad } from '../../entities/ad/types';

const myMockAds: Ad[] = [
  {
    id: '1',
    type: 'lost',
    species: 'Кошка',
    name: 'Мурка',
    description: 'Пушистая, серая, зеленые глаза. Очень ласковая.',
    location: 'Москва, район Хамовники',
    date: '2026-10-01',
    status: 'active',
    photos: ['/cat.jpg'],
    contacts: { phone: '+7 (999) 123-45-67', name: 'Анна' },
  },
  {
    id: '3',
    type: 'lost',
    species: 'Попугай',
    name: 'Кеша',
    description: 'Зеленый волнистый попугай. Умеет говорить "Кеша хороший".',
    location: 'Екатеринбург, Академический район',
    date: '2026-10-05',
    status: 'active',
    photos: ['/parrot.jpg'],
    contacts: { phone: '+7 (900) 555-66-77', name: 'Елена' },
  },
];

export const ProfilePage = () => {
  const [ads, setAds] = useState<Ad[]>(myMockAds);
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleMarkAsFound = (id: string) => {
    setAds((prevAds) =>
      prevAds.map((ad) =>
        ad.id === id ? { ...ad, status: 'found' } : ad
      )
    );
    setSnackbarOpen(true);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '16px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Мои объявления
      </Typography>
      
      <Typography variant="body1" color="text.secondary">
        Здесь вы можете управлять своими объявлениями и отмечать животных, которые нашлись.
      </Typography>

      {ads.length === 0 ? (
        <EmptyState message="У вас пока нет объявлений" />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '24px' }}>
          {ads.map((ad) => (
            <Paper key={ad.id} elevation={2} style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img 
                  src={ad.photos?.[0]} 
                  alt={ad.name} 
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} 
                />
                <div>
                  <Typography variant="h6">{ad.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{ad.location}</Typography>
                  <Chip 
                    label={ad.status === 'active' ? 'Ищем' : 'Найдено'} 
                    color={ad.status === 'active' ? 'warning' : 'success'} 
                    size="small" 
                    style={{ marginTop: '8px' }}
                  />
                </div>
              </div>

              {ad.status === 'active' && (
                <Button 
                  variant="contained" 
                  color="success" 
                  startIcon={<CheckCircleIcon />}
                  onClick={() => handleMarkAsFound(ad.id)}
                >
                  Пометить как найденное
                </Button>
              )}
            </Paper>
          ))}
        </div>
      )}

      {/* Уведомление об успешной смене статуса */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Статус изменен на «Найдено»!
        </Alert>
      </Snackbar>
    </div>
  );
};