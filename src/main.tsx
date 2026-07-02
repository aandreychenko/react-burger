import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from '@components/app/app.tsx';
import IngredientModal from '@components/ingredient-modal/ingredient-modal.tsx';
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
        path: 'register',
        Component: RegisterPage,
      },
      {
        path: 'login',
        Component: LoginPage,
      },
      {
        path: 'reset-password',
        Component: ResetPasswordPage,
      },
      {
        path: 'forgot-passsword',
        Component: ForgotPasswordPage,
      },
      {
        path: 'profile',
        Component: ProfilePage,
      },
      {
        path: 'profile-orders',
        Component: ProfileOrderPage,
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
