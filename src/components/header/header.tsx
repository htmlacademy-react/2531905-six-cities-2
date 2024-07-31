import UserNav from '@/components/user-nav/user-nav';
import Logo from '@/components/logo/logo';

type HeaderProps = {
  hideNav?: boolean;
}

function Header({hideNav}: HeaderProps) {

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo type="header" />
          </div>
          {
            !hideNav && <UserNav />
          }
        </div>
      </div>
    </header>
  );
}

export default Header;
