import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiUrl} from '@/constants';

import {Offer, OfferListItem, ReviewFormData, ReviewListItem} from '@/types';
import {ThunkOptions} from '@/types/state';
type ReviewPayload = {
  formData: ReviewFormData;
  offerId: string;
}

export const loadOffers = createAsyncThunk<OfferListItem[], undefined, ThunkOptions>(
  'offer/loadOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferListItem[]>(ApiUrl.Offers);

    return data;
  },
);

export const loadOffer = createAsyncThunk<Offer, string, ThunkOptions>(
  'offer/loadOffer',
  async (offerId, { extra: api}) => {
    const {data} = await api.get<Offer>(`${ApiUrl.Offers}/${offerId}`);

    return data;
  },
);

export const loadNearbyOffers = createAsyncThunk<OfferListItem[], string, ThunkOptions>(
  'offer/loadNearbyOffers',
  async (offerId, { extra: api}) => {
    const {data} = await api.get<OfferListItem[]>(`${ApiUrl.Offers}/${offerId}/nearby`);

    return data;
  },
);

export const loadReviews = createAsyncThunk<ReviewListItem[], string, ThunkOptions>(
  'offer/loadReviews',
  async (offerId, { extra: api}) => {
    const {data} = await api.get<ReviewListItem[]>(`${ApiUrl.Reviews}/${offerId}`);

    return data;
  },
);

export const sendReview = createAsyncThunk<ReviewListItem, ReviewPayload, ThunkOptions>(
  'offer/sendReview',
  async ({formData, offerId}, { extra: api }) => {
    const {data} = await api.post<ReviewListItem>(`${ApiUrl.Reviews}/${offerId}`, formData);

    return data;
  }
);
