import {createSlice} from '@reduxjs/toolkit';

import {NameSpace, RequestStatus} from '@/constants';
import {loadOffers, loadOffer, loadNearbyOffers, loadReviews, sendReview} from './api-actions';

import {Offer, OfferListItem, ReviewListItem} from '@/types';

type OfferState = {
  offers: OfferListItem[];
  offersListStatus: RequestStatus;
  offerStatus: RequestStatus;
  currentOffer: Offer | null;
  nearbyOffers: OfferListItem[];
  reviews: ReviewListItem[];
}

const initialState: OfferState = {
  offers: [],
  offersListStatus: RequestStatus.Idle,
  offerStatus: RequestStatus.Idle,
  currentOffer: null,
  nearbyOffers: [],
  reviews: [],
};

export const offersSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    clearOffer: (state) => {
      state.currentOffer = null;
      state.offerStatus = RequestStatus.Idle;
    },
    clearNearbyOffers: (state) => {
      state.nearbyOffers = [];
    },
    clearReviews: (state) => {
      state.reviews = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadOffers.pending, (state) => {
        state.offersListStatus = RequestStatus.Pending;
      })
      .addCase(loadOffers.fulfilled, (state, {payload}) => {
        state.offers = payload;
        state.offersListStatus = RequestStatus.Success;
      })
      .addCase(loadOffers.rejected, (state) => {
        state.offersListStatus = RequestStatus.Failed;
      })
      .addCase(loadOffer.pending, (state) => {
        state.offerStatus = RequestStatus.Pending;
      })
      .addCase(loadOffer.fulfilled, (state, {payload}) => {
        state.offerStatus = RequestStatus.Success;
        state.currentOffer = payload;
      })
      .addCase(loadOffer.rejected, (state) => {
        state.offerStatus = RequestStatus.Failed;
        state.currentOffer = null;
      })
      .addCase(loadNearbyOffers.fulfilled, (state, {payload}) => {
        state.nearbyOffers = payload;
      })
      .addCase(loadNearbyOffers.rejected, (state) => {
        state.nearbyOffers = [];
      })
      .addCase(loadReviews.fulfilled, (state, {payload}) => {
        state.reviews = payload;
      })
      .addCase(loadReviews.rejected, (state) => {
        state.reviews = [];
      })
      .addCase(sendReview.fulfilled, (state, {payload}) => {
        state.reviews.push(payload);
      });
  }
});

export const {clearOffer, clearNearbyOffers, clearReviews} = offersSlice.actions;
