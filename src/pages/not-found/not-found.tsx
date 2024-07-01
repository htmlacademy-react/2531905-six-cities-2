import {Link} from 'react-router-dom';

import Layout from '@/components/layout/layout';

import {AppRoute} from '@/constants';
import classes from './not-found.module.css';

function NotFound(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Layout>
        <main className="page__main page__main--index">
          <div className="container">
            <section className={classes.center}>
              <div className={classes.imageWrapper}>
                <img className={classes.image} src="img/404.png" alt="Page not found"/>
              </div>
              <h1>Requested page not found</h1>
              <Link to={AppRoute.MainPage}>
                <button className="form__submit button" type="submit">Go to Homepage</button>
              </Link>
            </section>
          </div>
        </main>
      </Layout>
    </div>
  );
}

export default NotFound;
