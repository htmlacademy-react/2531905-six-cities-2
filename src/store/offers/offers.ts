import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {NameSpace, CITIES, sortOptions, RequestStatus} from '@/constants';
import {loadOffers} from '@/store/api-actions';

import {OfferState} from '@/types/state';
import {City} from '@/types';

const initialState: OfferState = {
  offers: [],
  currentCity: CITIES[0],
  activeSort: sortOptions.Popular,
  offerStatus: RequestStatus.Idle,
};

export const offersSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    setCurrentCity: (state, action: PayloadAction<City>) => {
      state.currentCity = action.payload;
    },
    setActiveSort: (state, action: PayloadAction<string>) => {
      state.activeSort = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loadOffers.pending, (state) => {
        state.offerStatus = RequestStatus.Loading;
      })
      .addCase(loadOffers.fulfilled, (state, {payload}) => {
        state.offers = payload;
        state.offerStatus = RequestStatus.Success;
      })
      .addCase(loadOffers.rejected, (state) => {
        state.offerStatus = RequestStatus.Failed;
      });
  }
});

export const {setCurrentCity, setActiveSort} = offersSlice.actions;
