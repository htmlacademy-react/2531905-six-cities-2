import {createReducer} from '@reduxjs/toolkit';
import {setCurrentCity, setActiveSort, setOffers, setIsOffersLoading} from '@/store/actions';
import {City, OfferListItem} from '@/types';
import {CITIES, sortOptions} from '@/constants';

type stateType = {
  offers: OfferListItem[];
  currentCity: City;
  activeSort: string;
  isOffersLoading: boolean;
}

const initialState: stateType = {
  offers: [],
  currentCity: CITIES[0],
  activeSort: sortOptions.Popular,
  isOffersLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffers, (state, {payload}) => {
      state.offers = payload;
    })
    .addCase(setCurrentCity, (state, {payload}) => {
      state.currentCity = payload;
    })
    .addCase(setActiveSort, (state, {payload}) => {
      state.activeSort = payload;
    })
    .addCase(setIsOffersLoading, (state, {payload}) => {
      state.isOffersLoading = payload;
    });
});

export {reducer};
