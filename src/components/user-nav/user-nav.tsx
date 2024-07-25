import {Link, useNavigate} from 'react-router-dom';

import {useAppSelector} from '@/hooks/use-app-selector';
import {logout} from '@/store/user/api-actions';
import {store} from '@/store';
import {getAuthorizationStatus, getUser} from '@/store/user/selectors';
import {AppRoute, AuthorizationStatus} from '@/constants';

import classes from './user-nav.module.css';

function UserNav() {
  const navigate = useNavigate();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
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
            <div className="header__avatar-wrapper user__avatar-wrapper">
              <img className={classes.avatar} src={user?.avatarUrl} alt={user?.name}/>
            </div>
            <span className="header__user-name user__name">
              {user?.email}
            </span>
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
