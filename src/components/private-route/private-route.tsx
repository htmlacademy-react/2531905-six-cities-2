import {Navigate} from 'react-router-dom';

import {AppRoute, AuthorizationStatus} from '@/constants';
import {useAppSelector} from '@/hooks/use-app-selector';
import {getAuthorizationStatus} from '@/store/user/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthenticated = authorizationStatus === AuthorizationStatus.Auth;

  return isAuthenticated ? children : <Navigate to={AppRoute.LoginPage} />;
}

export default PrivateRoute;
