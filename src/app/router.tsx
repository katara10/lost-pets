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
import { ProtectedRoute } from './router/ProtectedRoute'; 

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'ads/:id', element: <AdDetailPage /> },
      
      { 
        path: 'ads/new', 
        element: <ProtectedRoute><AdFormPage /></ProtectedRoute> 
      },
      { 
        path: 'ads/:id/edit', 
        element: <ProtectedRoute><AdFormPage /></ProtectedRoute> 
      },
      
      { path: 'ads/:id/print', element: <PrintFlyerPage /> },
      
      { 
        path: 'profile', 
        element: <ProtectedRoute><ProfilePage /></ProtectedRoute> 
      },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '*', element: <NotFoundPage /> },
]);