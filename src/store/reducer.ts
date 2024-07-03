import {createReducer} from '@reduxjs/toolkit';
import {setCurrentCity} from '@/store/actions';
import {City, OfferListItem} from '@/types';
import {offers} from '@/mocks/offers';
import {CITIES} from '@/constants';

type stateType = {
  offers: OfferListItem[];
  currentCity: City;
}

const initialState: stateType = {
  offers,
  currentCity: CITIES[0],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCity, (state, {payload}) => {
      state.currentCity = payload;
    });
});

export {reducer};
