import OffersListError from '@/components/offers-list-error/offers-list-error';
import Layout from '@/components/layout/layout';
import Tabs from '@/components/tabs/tabs';

function ErrorBoundary() {
  return (
    <div className="page page--gray page--main">
      <Layout>
        <main className="page__main page__main--index">
          <Tabs/>
          <OffersListError />
        </main>
      </Layout>
    </div>
  );
}

export default ErrorBoundary;
