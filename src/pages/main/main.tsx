import clsx from 'clsx';

import OffersList from '@/components/offers-list/offers-list';
import Layout from '@/components/layout/layout';
import Tabs from '@/components/tabs/tabs';
import Loading from '@/components/loading/loading';

import {useAppSelector} from '@/hooks/use-app-selector';

function Main(): JSX.Element {
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);
  const offers = useAppSelector((state) => state.offers);
  const city = useAppSelector((state) => state.currentCity);
  const offersInCity = offers.filter((item) => item.city.name === city.name);

  const pageClass = clsx('page__main page__main--index', !offersInCity.length && ' page__main--index-empty');
  return (
    <div className="page page--gray page--main">
      <Layout>
        <main className={pageClass}>
          <Tabs/>
          {
            isOffersLoading ? <Loading /> : <OffersList offers={offersInCity} city={city}/>
          }
        </main>
      </Layout>
    </div>
  );
}

export default Main;
