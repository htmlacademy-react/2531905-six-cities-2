import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import Layout from '@/components/layout/layout';
import LoginForm from '@/components/login-form/login-form';
import {AppRoute, CITIES} from '@/constants';
import {getIsUserAuthorized} from '@/store/user/selectors';
import {setCurrentCity} from '@/store/app/app';
import {useAppSelector} from '@/hooks/use-app-selector';
import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {getRandomArrayValues} from '@/utils';

import classes from './login.module.css';

function Login(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isUserAuthorized = useAppSelector(getIsUserAuthorized);
  const randomCity = getRandomArrayValues(CITIES, 1)[0];

  const handleCityClick = () => {
    dispatch(setCurrentCity(randomCity));
  };

  useEffect(() => {
    if (isUserAuthorized) {
      navigate(AppRoute.MainPage);
    }
  }, [isUserAuthorized, navigate]);

  const sectionClass = `login ${classes.login}`;

  return (
    <div className="page page--gray page--login">
      <Layout showNav={false}>
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className={sectionClass}>
              <h1 className="login__title">Sign in</h1>
              <LoginForm />
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <Link to={AppRoute.MainPage} className="locations__item-link" onClick={handleCityClick}>
                  <span>{randomCity.name}</span>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </Layout>
    </div>
  );
}

export default Login;
