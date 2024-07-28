import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {ApiUrl} from '@/constants';
import {dropToken} from '@/services/token';
import {AuthData, LoginError, UserData} from '@/types';
import {ThunkOptions} from '@/types/state';

export const checkAuth = createAsyncThunk<UserData, undefined, ThunkOptions>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(ApiUrl.Login);

    return data;
  },
);

export const login = createAsyncThunk<UserData | LoginError, AuthData, ThunkOptions>(
  'user/login',
  async (payload, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.post<UserData>(ApiUrl.Login, payload);

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
  async (_args, {extra: api}) => {
    await api.delete(ApiUrl.Logout);
    dropToken();
  },
);
