import { useNavigate } from 'react-router-dom';
import { AdForm } from '../../features/ad-form/ui/AdForm';
import { type AdFormData } from '../../features/ad-form/model/schema';
import { Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';

export const AdFormPage = () => {
  const navigate = useNavigate();

  const handleCreateAd = (data: AdFormData) => {
    console.log('Данные из формы:', data);
    alert('Объявление создано (пока в консоли)');
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* 2. Оборачиваем всё содержимое страницы в motion.div */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Разместить объявление
        </Typography>
        
        <AdForm onSubmit={handleCreateAd} />
      </motion.div>
    </Container>
  );
};