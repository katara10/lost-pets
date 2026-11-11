import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export const RegisterPage = () => (
  <Container maxWidth="xs" sx={{ mt: 8, mb: 8 }}>
    <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
      
      <Typography variant="h5" component="h1" sx={{ textAlign: 'center' }}>
        Регистрация
      </Typography>
      
      <TextField label="Ваше имя" type="text" fullWidth />
      <TextField label="Email" type="email" fullWidth />
      <TextField label="Пароль" type="password" fullWidth />
      <TextField label="Повторите пароль" type="password" fullWidth />
      
      <Button variant="contained" color="primary" size="large" fullWidth>
        Создать аккаунт
      </Button>

      <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </Typography>

    </Paper>
  </Container>
);