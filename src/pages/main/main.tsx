import clsx from 'clsx';

import OffersList from '@/components/offers-list/offers-list';
import Layout from '@/components/layout/layout';
import Tabs from '@/components/tabs/tabs';
import Loader from '@/components/loader/loader';
import OffersListError from '@/components/offers-list-error/offers-list-error';

import {RequestStatus} from '@/constants';
import {useAppSelector} from '@/hooks/use-app-selector';
import {getOffers, getOffersListStatus} from '@/store/offers/selectors';
import {getCurrentCity} from '@/store/app/selectors';

function Main(): JSX.Element {
  const offersStatus = useAppSelector(getOffersListStatus);
  const offers = useAppSelector(getOffers);
  const city = useAppSelector(getCurrentCity);
  const offersInCity = offers.filter((item) => item.city.name === city.name);

  const isOffersLoading = offersStatus === RequestStatus.Pending;
  const isOffersError = offersStatus === RequestStatus.Failed;
  const pageClass = clsx('page__main page__main--index', !offersInCity.length && ' page__main--index-empty');

  let content = <OffersList offers={offersInCity} city={city}/>;

  if (isOffersError) {
    content = <OffersListError />;
  } else if (isOffersLoading) {
    content = <Loader />;
  }

  return (
    <div className="page page--gray page--main">
      <Layout>
        <main className={pageClass}>
          <Tabs/>
          {
            content
          }
        </main>
      </Layout>
    </div>
  );
}

export default Main;
