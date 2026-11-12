import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import { authService } from '../../shared/api/auth';

export const Header = () => {
  const navigate = useNavigate();
  const isAuth = authService.isAuthenticated();

  const handleLogout = async () => {
    const refresh = authService.getRefreshToken();
    if (refresh) {
      try {
        await axios.post('http://127.0.0.1:8000/api/auth/logout', { refresh_token: refresh });
      } catch (error) {
        console.error('Ошибка при выходе:', error);
      }
    }
    
    authService.clearTokens();
    navigate('/login');
  };

  return (
    <header style={{ padding: '16px', borderBottom: '1px solid #ccc', backgroundColor: '#fff' }}>
      <nav style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>Главная</Link>
          {isAuth && (
            <Link to="/ads/new" style={{ textDecoration: 'none', color: '#1976d2' }}>Разместить</Link>
          )}
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {isAuth ? (
            <>
              <Link to="/profile" style={{ textDecoration: 'none', color: '#1976d2' }}>Профиль</Link>
              <Button variant="outlined" color="error" size="small" onClick={handleLogout}>
                Выйти
              </Button>
            </>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>Войти</Link>
          )}
        </div>

      </nav>
    </header>
  );
};