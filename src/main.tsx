import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from '@components/app/app.tsx';
import { ForgotPasswordPage } from '@pages/forgot-password/forgot-password.tsx';
import { Home } from '@pages/home/home.tsx';
import { LoginPage } from '@pages/login/login.tsx';
import { ProfileOrderPage } from '@pages/profile/orders/orders.tsx';
import { ProfilePage } from '@pages/profile/profile.tsx';
import { RegisterPage } from '@pages/register/register.tsx';
import { ResetPasswordPage } from '@pages/reset-password/reset-password.tsx';
import { store } from '@services/store/store.ts';

import './index.css';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/reset-password',
        element: <ResetPasswordPage />,
      },
      {
        path: '/forgot-passsword',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/ingredients/:id',
        element: <h1>IngredientDetailPage</h1>,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/profile-orders',
        element: <ProfileOrderPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
