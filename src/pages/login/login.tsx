import {FormEvent, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import Layout from '@/components/layout/layout';
import {AppRoute} from '@/constants';
import {store} from '@/store';
import {login} from '@/store/api-actions.ts';
import {AuthData, ErrorDetail, LoginError} from '@/types';

import classes from './login.module.css';

function Login(): JSX.Element {
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const loginUser = async (data: AuthData) => {
    setErrors([]);
    const authResult = await store.dispatch(login(data));
    const payload = authResult.payload as LoginError;
    if (payload && !payload.errorType) {
      navigate(AppRoute.MainPage);
    } else {
      const inputErrors = payload.details.reduce((acc: string[], detail: ErrorDetail) => {
        acc.push(detail.messages.join('; '));
        return acc;
      }, []);
      setErrors(inputErrors);
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as AuthData;
    loginUser(data);
  };

  return (
    <div className="page page--gray page--login">
      <Layout>
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" onSubmit={handleFormSubmit}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input className="login__input form__input" type="email" name="email" placeholder="Email" required/>
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input className="login__input form__input" type="password" name="password" placeholder="Password"
                    required
                  />
                </div>
                <ul className={classes.errors}>
                  {
                    errors.map((error) => (
                      <li key={error}>{error}</li>
                    ))
                  }
                </ul>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <Link to={AppRoute.MainPage} className="locations__item-link">
                  <span>Amsterdam</span>
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
