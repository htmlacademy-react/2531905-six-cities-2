import {Link, useNavigate} from 'react-router-dom';

import {useAppSelector} from '@/hooks/use-app-selector';
import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {logout} from '@/store/user/api-actions';
import {getIsUserAuthorized, getUser} from '@/store/user/selectors';
import {getFavoriteOffers} from '@/store/offers/selectors';
import {AppRoute} from '@/constants';

import classes from './user-nav.module.css';

function UserNav() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const favorites = useAppSelector(getFavoriteOffers);
  const isUserAuthorized = useAppSelector(getIsUserAuthorized);
  const user = useAppSelector(getUser);

  const handleLogoutClick = () => {
    const payload = {
      onSuccess: () => {
        navigate(AppRoute.MainPage);
      }
    };
    dispatch(logout(payload));
  };

  if (!isUserAuthorized) {
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
            <span className="header__favorite-count">
              {favorites.length}
            </span>
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
