import {useState} from 'react';

import {OfferListItem} from '@/types';

import Card from '@/components/card/card';
import OffersListSort from '@/components/offers-list-sort/offers-list-sort';
import Tabs from '@/components/tabs/tabs';
import Map from '@/components/map/map';
import OffersListEmpty from '@/components/offers-list-empty/offers-list-empty';

import {useAppSelector} from '@/hooks/use-app-selector';

const sortOptions = [
  {
    title: 'Popular',
    func: () => 0,
  },
  {
    title: 'Price: low to high',
    func: (a: OfferListItem, b: OfferListItem) => (a.price - b.price),
  },
  {
    title: 'Price: high to low',
    func: (a: OfferListItem, b: OfferListItem) => (b.price - a.price),
  },
  {
    title: 'Top rated first',
    func: (a: OfferListItem, b: OfferListItem) => (b.rating - a.rating),
  },
];

function OffersList() {
  const [activeItem, setActiveItem] = useState('');
  const [activeSort, setActiveSort] = useState(0);

  const handleMouseEnter = (id: string) => setActiveItem(id);
  const handleMouseLeave = () => setActiveItem('');
  const handleSortChange = (index: number) => {
    setActiveSort(index);
  };

  const offers = useAppSelector((state) => state.offers);
  const city = useAppSelector((state) => state.currentCity);
  const offersInCity = offers.filter((item) => item.city.name === city.name).sort(sortOptions[activeSort].func);

  if (!offersInCity.length) {
    return (
      <main className="page__main page__main--index page__main--index-empty">
        <Tabs/>
        <OffersListEmpty city={city} />
      </main>
    );
  }

  const points = offersInCity.map(({ location, id }: OfferListItem) => ({ location, id}));
  const options = sortOptions.map((item) => item.title);

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
              activeSort={activeSort}
              onSortChange={handleSortChange}
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
