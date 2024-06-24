import {useState} from 'react';

import {OfferListItem} from '@/types';

import Card from '@/components/card/card';
import OffersListSort from '@/components/offers-list-sort/offers-list-sort';
import Map from '@/components/map/map';

type OffersListProps = {
  offers: OfferListItem[];
}

function OffersList({offers}: OffersListProps) {
  const [activeItem, setActiveItem] = useState('');

  const handleMouseEnter = (id: string) => setActiveItem(id);
  const handleMouseLeave = () => setActiveItem('');

  const points = offers.map(({ location, id }: OfferListItem) => ({ location, id}));
  const city = offers[0].city;

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {city.name}</b>
          <p style={{height: '10px'}}>{activeItem}</p>
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
          <Map className="cities__map" points={points} city={city} selectedPoint={activeItem} />
        </div>
      </div>
    </div>
  );
}

export default OffersList;
