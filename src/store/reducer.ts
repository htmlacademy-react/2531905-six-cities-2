import {createReducer} from '@reduxjs/toolkit';
import {setCurrentCity, setActiveSort} from '@/store/actions';
import {City, OfferListItem} from '@/types';
import {offers} from '@/mocks/offers';
import {CITIES, sortOptions} from '@/constants';

type stateType = {
  offers: OfferListItem[];
  currentCity: City;
  activeSort: string;
}

const initialState: stateType = {
  offers,
  currentCity: CITIES[0],
  activeSort: sortOptions.Popular,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCity, (state, {payload}) => {
      state.currentCity = payload;
    })
    .addCase(setActiveSort, (state, {payload}) => {
      state.activeSort = payload;
    });
});

export {reducer};
