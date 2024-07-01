import {useState} from 'react';

import {OfferListItem} from '@/types';

import Card from '@/components/card/card';
import OffersListSort from '@/components/offers-list-sort/offers-list-sort';
import Map from '@/components/map/map';
import {useAppSelector} from '@/hooks/use-app-selector';

type OffersListProps = {
  offers: OfferListItem[];
}

function OffersList({offers}: OffersListProps) {
  const [activeItem, setActiveItem] = useState('');

  const handleMouseEnter = (id: string) => setActiveItem(id);
  const handleMouseLeave = () => setActiveItem('');

  const points = offers.map(({ location, id }: OfferListItem) => ({ location, id}));
  const city = useAppSelector((state) => state.currentCity);

  return offers.length > 0 ?
    (
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in {city.name}</b>
            <OffersListSort />
            <div className="cities__places-list places__list">
              {
                offers.map((card: OfferListItem) => (
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
            <Map key={city.name} className="cities__map" points={points} city={city} selectedPoint={activeItem} />
          </div>
        </div>
      </div>
    ) : (
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment in {city.name}</p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    );
}

export default OffersList;
