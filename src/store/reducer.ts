import {createReducer} from '@reduxjs/toolkit';
import {setCurrentCity, setOffers} from '@/store/actions';
import {City, OfferListItem} from '@/types';
import {cities} from '@/mocks/cities';

type stateType = {
  offers: OfferListItem[];
  cities: City[];
  currentCity: City;
}

const initialState: stateType = {
  cities,
  offers: [],
  currentCity: cities[0],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCity, (state, {payload}) => {
      state.currentCity = payload;
    })
    .addCase(setOffers, (state, {payload}) => {
      state.offers = payload;
    });
});

export {reducer};
