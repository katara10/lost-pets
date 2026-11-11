import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Chip } from '@mui/material';
import type { Ad } from './types';

export const AdCard = ({ ad }: { ad: Ad }) => {
  return (
    <Link to={`/ads/${ad.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="200"
          image={ad.photos?.[0] || 'https://via.placeholder.com/400x200?text=No+Photo'}
          alt={ad.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div">
            {ad.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {ad.location}
          </Typography>
          <Chip 
            label={ad.status === 'active' ? (ad.type === 'lost' ? 'Ищем' : 'Найдено') : 'Закрыто'} 
            color={ad.status === 'active' ? 'warning' : 'success'} 
            size="small" 
            sx={{ mt: 2 }} 
          />
        </CardContent>
      </Card>
    </Link>
  );
};