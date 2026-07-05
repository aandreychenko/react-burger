import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from '@components/app/app.tsx';
import IngredientModal from '@components/ingredient-modal/ingredient-modal.tsx';
import { ProtectedRoute } from '@components/protected-route/protected-route.tsx';
import { FeedPage } from '@pages/feed/feed.tsx';
import { ForgotPasswordPage } from '@pages/forgot-password/forgot-password.tsx';
import { Home } from '@pages/home/home.tsx';
import { LoginPage } from '@pages/login/login.tsx';
import { NotFoundPage } from '@pages/not-found/not-found.tsx';
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
        path: '/',
        Component: Home,
        children: [
          {
            path: 'ingredients/:id',
            Component: IngredientModal,
          },
        ],
      },
      {
        path: '/feed',
        Component: FeedPage,
      },

      {
        path: 'register',
        element: (
          <ProtectedRoute onlyUnAuth>
            <RegisterPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'login',
        element: (
          <ProtectedRoute onlyUnAuth>
            <LoginPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <ProtectedRoute onlyUnAuth>
            <ForgotPasswordPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'reset-password',
        element: (
          <ProtectedRoute onlyUnAuth>
            <ResetPasswordPage />
          </ProtectedRoute>
        ),
      },

      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
          },
          {
            path: 'orders',
            Component: ProfileOrderPage,
          },
        ],
      },

      {
        path: '*',
        Component: NotFoundPage,
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
