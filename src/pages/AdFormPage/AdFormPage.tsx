import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdForm } from '../../features/ad-form/ui/AdForm';
import { Typography, Container, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import apiClient from '../../shared/api/client';

export const AdFormPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateAd = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await apiClient.post('/ads/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError('Не удалось создать объявление. Проверьте данные.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Разместить объявление
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <AdForm onSubmit={handleCreateAd} isSubmitting={isSubmitting} />
      </motion.div>
    </Container>
  );
};