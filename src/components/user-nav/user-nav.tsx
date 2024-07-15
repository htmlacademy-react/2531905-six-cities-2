import {Link, useNavigate} from 'react-router-dom';

import {useAppSelector} from '@/hooks/use-app-selector';
import {logout} from '@/store/api-actions';
import {store} from '@/store';
import {getAuthorizationStatus} from '@/store/user/selectors';
import {AppRoute, AuthorizationStatus} from '@/constants';

function UserNav() {
  const navigate = useNavigate();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthenticated = authorizationStatus === AuthorizationStatus.Auth;

  const handleLogoutClick = () => {
    store.dispatch(logout());
    navigate(AppRoute.LoginPage);
  };

  if (!isAuthenticated) {
    return (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link to={AppRoute.LoginPage} className="header__nav-link header__nav-link--profile">
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to={AppRoute.FavoritesPage} className="header__nav-link header__nav-link--profile">
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
            <span className="header__favorite-count">3</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <a className="header__nav-link" onClick={handleLogoutClick}>
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default UserNav;
