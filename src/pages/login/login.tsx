import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import Layout from '@/components/layout/layout';
import LoginForm from '@/components/login-form/login-form';
import {AppRoute, RequestStatus} from '@/constants';
import {getRequestStatus, getIsUserAuthorized} from '@/store/user/selectors';
import {useAppSelector} from '@/hooks/use-app-selector';

import classes from './login.module.css';

function Login(): JSX.Element {
  const navigate = useNavigate();
  const status = useAppSelector(getRequestStatus);
  const isUserAuthorized = useAppSelector(getIsUserAuthorized);

  useEffect(() => {
    if (status === RequestStatus.Success && isUserAuthorized) {
      navigate(AppRoute.MainPage);
    }
  }, [status, isUserAuthorized, navigate]);

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
                <Link to={AppRoute.MainPage} className="locations__item-link">
                  <span>Paris</span>
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
