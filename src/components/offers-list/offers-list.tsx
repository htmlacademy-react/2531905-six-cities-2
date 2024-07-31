import {useCallback, useMemo, useState} from 'react';

import {City, OfferListItem} from '@/types';

import Card from '@/components/card/card';
import OffersListSort from '@/components/offers-list-sort/offers-list-sort';
import Map from '@/components/map/map';
import OffersListEmpty from '@/components/offers-list-empty/offers-list-empty';

import {getActiveSort} from '@/store/app/selectors';
import {useAppSelector} from '@/hooks/use-app-selector';
import {SORT_OPTIONS} from '@/constants';

type OffersListProps = {
  offers: OfferListItem[];
  city: City;
}

function OffersList({offers, city}: OffersListProps) {
  const [activeItem, setActiveItem] = useState('');
  const activeSort = useAppSelector(getActiveSort);
  const sortedOffers = offers.sort(SORT_OPTIONS[activeSort]);
  const points = sortedOffers.map(({ location, id }) => ({ location, id}));

  const handleMouseEnter = useCallback((id: string) => setActiveItem(id), []);
  const handleMouseLeave = useCallback(() => setActiveItem(''), []);

  const memoizedOffers = useMemo(() => (
    sortedOffers.map((card: OfferListItem) => (
      <Card
        key={card.id}
        className="cities"
        card={card}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    ))
  ), [handleMouseEnter, handleMouseLeave, sortedOffers]);

  if (!offers.length) {
    return <OffersListEmpty city={city} />;
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {city.name}</b>
          <OffersListSort/>
          <div className="cities__places-list places__list">
            {
              memoizedOffers
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
  );
}

export default OffersList;
