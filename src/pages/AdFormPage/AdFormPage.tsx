import { useNavigate } from 'react-router-dom';
import { AdForm } from '../../features/ad-form/ui/AdForm';
import { type AdFormData } from '../../features/ad-form/model/schema';
import { Typography, Container } from '@mui/material';

export const AdFormPage = () => {
  const navigate = useNavigate();

  const handleCreateAd = (data: AdFormData) => {
    console.log('Данные из формы:', data);
    alert('Объявление создано (пока в консоли)');
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Разместить объявление
      </Typography>
      <AdForm onSubmit={handleCreateAd} />
    </Container>
  );
};