import {OfferListItem} from '@/types';

import OffersList from '@/components/offers-list/offers-list';
import Layout from '@/components/layout/layout';
import Tabs from '@/components/tabs/tabs';

type MainProps = {
  offers: OfferListItem[];
}

function Main({offers}: MainProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Layout>
        <main className="page__main page__main--index">
          <Tabs />
          <OffersList offers={offers}/>
        </main>
      </Layout>
    </div>
  );
}

export default Main;
