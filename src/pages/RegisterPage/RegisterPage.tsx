import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import { authService } from '../../shared/api/auth';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.post('http://127.0.0.1:8000/api/auth/register', {
        email: data.email,
        password: data.password,
      });

      const loginResponse = await axios.post('http://127.0.0.1:8000/api/auth/login', {
        email: data.email,
        password: data.password,
      });

      authService.saveTokens(loginResponse.data.access_token, loginResponse.data.refresh_token);
      navigate('/');
      
    } catch (err: any) {
      console.error(err);
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Произошла ошибка при регистрации. Попробуйте позже.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        <Typography variant="h5" component="h1" sx={{ textAlign: 'center' }}>
          Регистрация
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
            {...register('password', { 
              required: 'Пароль обязателен',
              minLength: { value: 6, message: 'Минимум 6 символов' } 
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField 
            label="Повторите пароль" 
            type="password" 
            fullWidth
            {...register('confirmPassword', { 
              required: 'Повторите пароль',
              validate: value => value === password || 'Пароли не совпадают'
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            size="large" 
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Создание аккаунта...' : 'Создать аккаунт'}
          </Button>
        </form>

        <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </Typography>

      </Paper>
    </Container>
  );
};