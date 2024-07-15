import {createAsyncThunk} from '@reduxjs/toolkit';

import {AppDispatch, State} from '@/types/state';
import {AxiosError, AxiosInstance} from 'axios';
import {AuthData, LoginError, OfferListItem, UserData} from '@/types';

import {ApiUrl} from '@/constants';
import {RejectedWithValueActionFromAsyncThunk} from "@reduxjs/toolkit/dist/matchers";

export const loadOffers = createAsyncThunk<OfferListItem[], undefined, {
  extra: AxiosInstance;
}>(
  'offer/loadOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferListItem[]>(ApiUrl.Offers);
    return data;
  },
);

export const checkAuth = createAsyncThunk<void, undefined, {
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    await api.get(ApiUrl.Login);
  },
);

export const login = createAsyncThunk<UserData | LoginError, AuthData, {
  extra: AxiosInstance;
  rejectWithValue: RejectedWithValueActionFromAsyncThunk<never>;
}>(
  'user/login',
  async (payload, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.post<UserData>(ApiUrl.Login, payload);
      api.defaults.headers.common['X-Token'] = data.token;
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data as LoginError);
      }
      return rejectWithValue(error as LoginError);
    }
  },
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_args, {extra: api}) => {
    await api.delete(ApiUrl.Logout);
  },
);
