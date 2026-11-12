import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import { authService } from '../../shared/api/auth';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login', data);
      authService.saveTokens(response.data.access_token, response.data.refresh_token);
      navigate('/');
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Неверный email или пароль');
      } else {
        setError('Произошла ошибка при входе. Попробуйте позже.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        <Typography variant="h5" component="h1" sx={{ textAlign: 'center' }}>
          Вход в систему
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField 
            label="Email" 
            type="email" 
            fullWidth
            {...register('email', { required: 'Email обязателен' })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          
          <TextField 
            label="Пароль" 
            type="password" 
            fullWidth
            {...register('password', { required: 'Пароль обязателен' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            size="large" 
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </Button>
        </form>

        <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </Typography>

      </Paper>
    </Container>
  );
};