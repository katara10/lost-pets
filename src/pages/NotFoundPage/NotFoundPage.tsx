import { Link } from 'react-router-dom';
import { Typography, Button, Container } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export const NotFoundPage = () => (
  <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
    <SearchOffIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
    <Typography variant="h3" component="h1" gutterBottom>
      404
    </Typography>
    <Typography variant="h5" color="text.secondary" gutterBottom>
      Страница не найдена
    </Typography>
    <Button component={Link} to="/" variant="contained" sx={{ mt: 4 }}>
      Вернуться на главную
    </Button>
  </Container>
);