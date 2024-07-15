import clsx from 'clsx';

import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {useAppSelector} from '@/hooks/use-app-selector';
import {setCurrentCity} from '@/store/offers/offers';
import {getCurrentCity} from '@/store/offers/selectors';
import {CITIES} from '@/constants';

import {City} from '@/types';

function Tabs() {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCurrentCity);

  const handleCityClick = (city: City) => {
    dispatch(setCurrentCity(city));
  };

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {
              CITIES.map((city: City) => {
                const className = clsx('locations__item-link tabs__item', city.name === currentCity.name && 'tabs__item--active');
                return (
                  <li key={city.name} className="locations__item">
                    <a className={className} onClick={() => handleCityClick(city)}>
                      <span>{city.name}</span>
                    </a>
                  </li>
                );
              })
            }
          </ul>
        </section>
      </div>
    </>
  );
}

export default Tabs;
