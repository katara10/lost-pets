import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header style={{ padding: '16px', borderBottom: '1px solid #ccc' }}>
      <nav style={{ display: 'flex', gap: '16px' }}>
        <Link to="/">Главная</Link>
        <Link to="/ads/new">Разместить</Link>
        <Link to="/profile">Профиль</Link>
        <Link to="/login">Войти</Link>
      </nav>
    </header>
  );
};