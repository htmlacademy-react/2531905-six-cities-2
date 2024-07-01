import {useAppSelector} from '@/hooks/use-app-selector';

import {City} from '@/types';
import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {setCurrentCity, setOffers} from '@/store/actions';
import {offers} from '@/mocks/offers';
import {useCallback, useEffect} from 'react';

function Tabs() {
  const cities = useAppSelector((state) => state.cities);

  const dispatch = useAppDispatch();

  const setCityAndOffers = useCallback((city: City) => {
    const offersInCity = offers.filter((item) => item.city.name === city.name);
    dispatch(setCurrentCity(city));
    dispatch(setOffers(offersInCity));
  }, [dispatch]);

  const cityClickHandler = (city: City) => {
    setCityAndOffers(city);
  };

  useEffect(() => {
    setCityAndOffers(cities[0]);
  }, [cities, setCityAndOffers]);

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {
              cities.map((city: City) => (
                <li key={city.name} className="locations__item">
                  <a className="locations__item-link tabs__item tabs__item--active" onClick={() => cityClickHandler(city)}>
                    <span>{city.name}</span>
                  </a>
                </li>
              ))
            }
          </ul>
        </section>
      </div>
    </>
  );
}

export default Tabs;
