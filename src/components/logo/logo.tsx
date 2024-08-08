import {AppRoute} from '@/constants';
import {Link} from 'react-router-dom';

type LogoProps = {
  type: 'header' | 'footer';
}

const SIZES = {
  header: {
    width: 81,
    height: 41,
  },
  footer: {
    width: 64,
    height: 33,
  }
};

function Logo({ type }: LogoProps): JSX.Element {
  const {width, height} = SIZES[type];

  return (
    <Link to={AppRoute.MainPage} className={`${type}__logo-link`}>
      <img
        className="footer__logo"
        src="img/logo.svg"
        alt="6 cities logo"
        width={width}
        height={height}
      />
    </Link>
  );
}

export default Logo;
