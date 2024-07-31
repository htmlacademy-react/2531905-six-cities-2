import {createSlice} from '@reduxjs/toolkit';
import {StatusCodes} from 'http-status-codes';
import {AxiosError} from 'axios';

import {NameSpace, RequestStatus} from '@/constants';
import {loadOffers, loadOffer, loadNearbyOffers, loadReviews, sendReview, getFavorites, toggleFavorite} from './api-actions';

import {Offer, OfferListItem, ReviewListItem} from '@/types';

type OfferState = {
  offers: OfferListItem[];
  favorites: OfferListItem[];
  offersListStatus: RequestStatus;
  offerStatus: RequestStatus;
  errorCode: StatusCodes | null;
  currentOffer: Offer | null;
  nearbyOffers: OfferListItem[];
  reviews: ReviewListItem[];
  reviewRequestStatus: RequestStatus;
}

const initialState: OfferState = {
  offers: [],
  favorites: [],
  offersListStatus: RequestStatus.Idle,
  offerStatus: RequestStatus.Idle,
  errorCode: null,
  currentOffer: null,
  nearbyOffers: [],
  reviews: [],
  reviewRequestStatus: RequestStatus.Idle,
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
    clearFavorites: (state) => {
      state.favorites = [];
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
      .addCase(loadOffer.rejected, (state, {payload}) => {
        const error = payload as AxiosError;
        state.offerStatus = RequestStatus.Failed;
        if (error.response) {
          state.errorCode = error.response.status;
        }
        state.currentOffer = null;
      })
      .addCase(loadNearbyOffers.fulfilled, (state, {payload}) => {
        state.nearbyOffers = payload;
      })
      .addCase(loadNearbyOffers.rejected, (state) => {
        state.nearbyOffers = [];
      })
      .addCase(loadReviews.fulfilled, (state, {payload}) => {
        state.reviews = payload.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      })
      .addCase(loadReviews.rejected, (state) => {
        state.reviews = [];
      })
      .addCase(sendReview.pending, (state) => {
        state.reviewRequestStatus = RequestStatus.Pending;
      })
      .addCase(sendReview.fulfilled, (state, {payload}) => {
        state.reviews.unshift(payload);
        state.reviewRequestStatus = RequestStatus.Success;
      })
      .addCase(sendReview.rejected, (state) => {
        state.reviewRequestStatus = RequestStatus.Failed;
      })
      .addCase(getFavorites.fulfilled, (state, {payload}) => {
        state.favorites = payload;
      })
      .addCase(getFavorites.rejected, (state) => {
        state.favorites = [];
      })
      .addCase(toggleFavorite.fulfilled, (state, {payload}) => {
        if (payload.isFavorite) {
          state.favorites.push(payload);
        } else {
          state.favorites = state.favorites.filter((item) => item.id !== payload.id);
        }
      });
  }
});

export const {
  clearOffer,
  clearNearbyOffers,
  clearReviews,
  clearFavorites
} = offersSlice.actions;
