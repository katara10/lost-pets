import { Outlet } from 'react-router-dom';
import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main style={{ minHeight: 'calc(100vh - 128px)', padding: '16px' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};