import {OfferListItem} from '@/types';
import Layout from '@/components/layout/layout';
import Card from '@/components/card/card';
import {useAppSelector} from '@/hooks/use-app-selector';
import {getOffers} from '@/store/offers/selectors';

type groupedOffer = {
  [key: string]: OfferListItem[];
}

function Favorites(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const favorites = offers.filter((item) => item.isFavorite);

  const groupedOffers: groupedOffer = favorites.reduce((acc: groupedOffer, offer) => {
    if (!acc[offer.city.name]) {
      acc[offer.city.name] = [];
    }
    acc[offer.city.name].push(offer);
    return acc;
  }, {});

  return (
    <div className="page">
      <Layout needFooter>
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {
                  Object.entries(groupedOffers).map(([city, offersItems]) => (
                    <li key={city} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{city}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {
                          offersItems.map((offer) => (
                            <Card key={offer.id} card={offer} className="favorites" />
                          ))
                        }
                      </div>
                    </li>
                  ))
                }
              </ul>
            </section>
          </div>
        </main>
      </Layout>
    </div>
  );
}

export default Favorites;
