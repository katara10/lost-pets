import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Chip } from '@mui/material';
import type { Ad } from './types';
import { motion } from 'framer-motion';

export const AdCard = ({ ad }: { ad: Ad }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.3 }}
      style={{ height: '100%' }}
    >
      <Link to={`/ads/${ad.id}`} style={{ textDecoration: 'none' }}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            component="img"
            sx={{ height: 200, objectFit: 'cover' }}
            image={ad.photos?.[0] || 'https://via.placeholder.com/400x200?text=Нет+фото'}
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
    </motion.div>
  );
};