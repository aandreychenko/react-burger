import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '@services/hooks/hooks.ts';
import { selectIsAuthChecked, selectUser } from '@services/store/user/slice.ts';

import type React from 'react';

type LocationState = {
  from?: {
    pathname: string;
  };
};

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children,
}: ProtectedRouteProps): React.JSX.Element | null => {
  const user = useAppSelector(selectUser);
  const isAuthChecked = useAppSelector(selectIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const state = location.state as LocationState;
    const from = state?.from?.pathname ?? '/';
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={'/login'} state={{ from: location }} replace />;
  }

  return children;
};
