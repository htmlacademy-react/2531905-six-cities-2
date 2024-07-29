import {Link} from 'react-router-dom';

import {OfferListItem} from '@/types';
import {AppRoute, CITIES} from '@/constants';

import Layout from '@/components/layout/layout';
import Card from '@/components/card/card';
import FavoritesEmpty from '@/components/favorites-empty/favorites-empty';
import {getFavoriteOffers} from '@/store/offers/selectors';
import {setCurrentCity} from '@/store/app/app';
import {useAppSelector} from '@/hooks/use-app-selector';
import {useAppDispatch} from '@/hooks/use-app-dispatch';

type groupedOffer = {
  [key: string]: OfferListItem[];
}

function Favorites(): JSX.Element {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(getFavoriteOffers);

  const groupedOffers: groupedOffer = favorites.reduce((acc: groupedOffer, offer) => {
    if (!acc[offer.city.name]) {
      acc[offer.city.name] = [];
    }
    acc[offer.city.name].push(offer);
    return acc;
  }, {});

  const handleCityClick = (name: string) => {
    const city = CITIES.find((item) => item.name === name);
    if (city) {
      dispatch(setCurrentCity(city));
    }
  };

  if (!favorites.length) {
    return <FavoritesEmpty />;
  }

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
                          <Link to={AppRoute.MainPage} className="locations__item-link" onClick={() => handleCityClick(city)}>
                            <span>{city}</span>
                          </Link>
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
