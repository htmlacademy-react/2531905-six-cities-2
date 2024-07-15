import {Link} from 'react-router-dom';

import UserNav from '@/components/user-nav/user-nav';

import {AppRoute} from '@/constants';

function Header() {

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.MainPage} className="header__logo-link">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <UserNav />
        </div>
      </div>
    </header>
  );
}

export default Header;
