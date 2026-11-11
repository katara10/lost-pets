import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export const LoginPage = () => (
  <Container maxWidth="xs" sx={{ mt: 8 }}>
    <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
      
      <Typography variant="h5" component="h1" sx={{ textAlign: 'center' }}>
        Вход в систему
      </Typography>
      
      <TextField label="Email" type="email" fullWidth />
      <TextField label="Пароль" type="password" fullWidth />
      
      <Button variant="contained" size="large" fullWidth>
        Войти
      </Button>

      <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </Typography>

    </Paper>
  </Container>
);