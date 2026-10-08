import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from '../pages/HomePage/HomePage';
import { AdDetailPage } from '../pages/AdDetailPage/AdDetailPage';
import { AdFormPage } from '../pages/AdFormPage/AdFormPage';
import { PrintFlyerPage } from '../pages/PrintFlyerPage/PrintFlyerPage';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'ads/:id', element: <AdDetailPage /> },
      { path: 'ads/new', element: <AdFormPage /> },
      { path: 'ads/:id/edit', element: <AdFormPage /> },
      { path: 'ads/:id/print', element: <PrintFlyerPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '*', element: <NotFoundPage /> },
]);