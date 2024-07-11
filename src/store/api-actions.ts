import {createAsyncThunk} from '@reduxjs/toolkit';

import {AppDispatch, State} from '@/types/state';
import {AxiosInstance} from 'axios';
import {OfferListItem} from '@/types';

import {ApiUrl} from '@/constants';
import {setIsOffersLoading, setOffers} from '@/store/actions';

export const loadOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/loadOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setIsOffersLoading(true));
    const {data} = await api.get<OfferListItem[]>(ApiUrl.Offers);
    dispatch(setOffers(data));
    dispatch(setIsOffersLoading(false));
  },
);
