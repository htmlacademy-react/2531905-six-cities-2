import OffersList from '@/components/offers-list/offers-list';
import Layout from '@/components/layout/layout';

function Main(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Layout>
        <OffersList />
      </Layout>
    </div>
  );
}

export default Main;
