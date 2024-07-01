import clsx from 'clsx';

import OffersList from '@/components/offers-list/offers-list';
import Layout from '@/components/layout/layout';
import Tabs from '@/components/tabs/tabs';
import {useAppSelector} from '@/hooks/use-app-selector';

function Main(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);

  const pageClass = clsx('page__main page__main--index', !offers.length && 'page__main--index-empty');

  return (
    <div className="page page--gray page--main">
      <Layout>
        <main className={pageClass}>
          <Tabs/>
          <OffersList offers={offers}/>
        </main>
      </Layout>
    </div>
  );
}

export default Main;
