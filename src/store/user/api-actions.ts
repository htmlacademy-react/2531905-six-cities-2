import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {ApiUrl} from '@/constants';
import {dropToken, saveToken} from '@/services/token';
import {getFavorites} from '@/store/offers/api-actions';
import {clearFavorites} from '@/store/offers/offers';

import {AuthData, LoginError, UserData} from '@/types';
import {ThunkOptions} from '@/types/state';

export const checkAuth = createAsyncThunk<UserData, undefined, ThunkOptions>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<UserData>(ApiUrl.Login);
    dispatch(getFavorites());

    return data;
  },
);

export const login = createAsyncThunk<UserData | LoginError, AuthData, ThunkOptions>(
  'user/login',
  async (payload, {dispatch, extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.post<UserData>(ApiUrl.Login, payload);
      saveToken(data.token);
      dispatch(getFavorites());

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk<void, undefined, ThunkOptions>(
  'user/logout',
  async (_args, {dispatch, extra: api}) => {
    await api.delete(ApiUrl.Logout);
    dispatch(clearFavorites());
    dropToken();
  },
);
