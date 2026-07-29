import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '@services/hooks/hooks.ts';
import { selectIsAuthChecked, selectUser } from '@services/store/user/slice.ts';
import { isTokenExists } from '@utils/token.ts';

import type { JSX, ReactElement } from 'react';

type LocationState = {
  from?: {
    pathname: string;
  };
};

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children,
}: ProtectedRouteProps): JSX.Element | null => {
  const user = useAppSelector(selectUser);
  const isAuthChecked = useAppSelector(selectIsAuthChecked);
  const isAuthenticated = !!user && isTokenExists();
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuthenticated) {
    const state = location.state as LocationState;
    const from = state?.from?.pathname ?? '/';
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to={'/login'} state={{ from: location }} replace />;
  }

  return children;
};
