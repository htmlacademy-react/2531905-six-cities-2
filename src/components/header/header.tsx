import UserNav from '@/components/user-nav/user-nav';
import Logo from '@/components/logo/logo';

type HeaderProps = {
  showNav: boolean;
}

function Header({showNav = true}: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo type="header" />
          </div>
          {
            showNav && <UserNav />
          }
        </div>
      </div>
    </header>
  );
}

export default Header;
