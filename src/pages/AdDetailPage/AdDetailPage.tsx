import { useParams, Link, useNavigate } from 'react-router-dom';
import { Typography, Button, Paper, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ShareButton } from '../../features/share-button/ShareButton';
import { mockAds } from '../../shared/mocks/ads';

export const AdDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const ad = mockAds.find((a) => a.id === id);

  if (!ad) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 16px' }}>
        <Typography variant="h4" color="error" gutterBottom>
          Объявление не найдено
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Возможно, оно было удалено или ссылка неверна.
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
          startIcon={<ArrowBackIcon />}
        >
          Вернуться на главную
        </Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '16px' }}>
      {/* Кнопка "Назад" */}
      <Button 
        component={Link} 
        to="/" 
        startIcon={<ArrowBackIcon />} 
        style={{ marginBottom: '16px' }}
      >
        Назад к списку
      </Button>

      <Paper elevation={3} style={{ padding: '24px' }}>
        {/* Заголовок и статус */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
          <Typography variant="h3" component="h1">
            {ad.name}
          </Typography>
          <Chip 
            label={ad.status === 'active' ? (ad.type === 'lost' ? 'Ищем' : 'Найдено') : 'Закрыто'} 
            color={ad.status === 'active' ? 'warning' : 'success'} 
          />
        </div>

        {/* Фотография */}
        <img 
          src={ad.photos?.[0] || 'https://via.placeholder.com/800x400?text=Нет+фото'} 
          alt={ad.name} 
          style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '24px' }} 
        />

        {/* Детали объявления */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Typography variant="h6" color="primary">
            {ad.type === 'lost' ? 'Потеряно' : 'Найдено'} • {ad.species}
          </Typography>
          
          <Typography variant="body1">
            {ad.description}
          </Typography>

          <div style={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Место:</strong> {ad.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Дата:</strong> {ad.date}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ marginTop: '8px' }}>
              <strong>Контакты:</strong> {ad.contacts.name} — {ad.contacts.phone}
            </Typography>
          </div>
        </div>

        {/* Кнопка Поделиться */}
        <div style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
          <ShareButton />
        </div>
      </Paper>
    </div>
  );
};