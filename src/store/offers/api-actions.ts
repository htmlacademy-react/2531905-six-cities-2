import {createAsyncThunk} from '@reduxjs/toolkit';

import {OfferListItem} from '@/types';
import {ThunkOptions} from '@/types/state.ts';
import {ApiUrl} from '@/constants';

export const loadOffers = createAsyncThunk<OfferListItem[], undefined, ThunkOptions>(
  'offer/loadOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferListItem[]>(ApiUrl.Offers);

    return data;
  },
);
