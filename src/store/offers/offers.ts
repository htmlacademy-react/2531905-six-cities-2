import {createSlice} from '@reduxjs/toolkit';

import {NameSpace, RequestStatus} from '@/constants';
import {loadOffers} from './api-actions';

import {OfferListItem} from '@/types';

type OfferState = {
  offers: OfferListItem[];
  offerStatus: RequestStatus;
}

const initialState: OfferState = {
  offers: [],
  offerStatus: RequestStatus.Idle,
};

export const offersSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadOffers.pending, (state) => {
        state.offerStatus = RequestStatus.Pending;
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
