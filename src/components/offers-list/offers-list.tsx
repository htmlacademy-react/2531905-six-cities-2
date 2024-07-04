import {useState} from 'react';

import {OfferListItem} from '@/types';

import Card from '@/components/card/card';
import OffersListSort from '@/components/offers-list-sort/offers-list-sort';
import Tabs from '@/components/tabs/tabs';
import Map from '@/components/map/map';
import OffersListEmpty from '@/components/offers-list-empty/offers-list-empty';
import {useAppSelector} from '@/hooks/use-app-selector';

import {SORT_OPTIONS} from '@/constants';

function OffersList() {
  const [activeItem, setActiveItem] = useState('');
  const activeSort = useAppSelector((state) => state.activeSort);

  const handleMouseEnter = (id: string) => setActiveItem(id);
  const handleMouseLeave = () => setActiveItem('');

  const offers = useAppSelector((state) => state.offers);
  const city = useAppSelector((state) => state.currentCity);
  const offersInCity = offers
    .filter((item) => item.city.name === city.name)
    .sort(SORT_OPTIONS[activeSort]);

  if (!offersInCity.length) {
    return (
      <main className="page__main page__main--index page__main--index-empty">
        <Tabs/>
        <OffersListEmpty city={city} />
      </main>
    );
  }

  const points = offersInCity.map(({ location, id }) => ({ location, id}));
  const options = Object.keys(SORT_OPTIONS);

  return (
    <main className="page__main page__main--index">
      <Tabs/>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offersInCity.length} places to stay in {city.name}</b>
            <OffersListSort
              options={options}
            />
            <div className="cities__places-list places__list">
              {
                offersInCity.map((card: OfferListItem) => (
                  <Card
                    key={card.id}
                    className="cities"
                    card={card}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
                ))
              }
            </div>
          </section>
          <div className="cities__right-section">
            <Map
              key={city.name}
              className="cities__map"
              points={points}
              city={city}
              selectedPoint={activeItem}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default OffersList;
