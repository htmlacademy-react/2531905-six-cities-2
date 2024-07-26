import {createSlice} from '@reduxjs/toolkit';

import {NameSpace, AuthorizationStatus, RequestStatus} from '@/constants';
import {checkAuth, login, logout} from './api-actions';
import {saveToken} from '@/services/token';
import {ErrorDetail, LoginError, UserData} from '@/types';

type UsersState = {
  authorizationStatus: AuthorizationStatus;
  requestStatus: RequestStatus;
  loginResponseErrors: string[];
  user: UserData | null;
}

const initialState: UsersState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  requestStatus: RequestStatus.Idle,
  loginResponseErrors: [],
  user: null,
};

export const usersSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuth.fulfilled, (state, {payload}) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(login.pending, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.requestStatus = RequestStatus.Pending;
      })
      .addCase(login.fulfilled, (state, {payload}) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.requestStatus = RequestStatus.Success;
        const data = payload as UserData;
        state.user = data;
        saveToken(data.token);
      })
      .addCase(login.rejected, (state, {payload}) => {
        const error = payload as LoginError;
        state.loginResponseErrors = error.details.reduce((acc: string[], detail: ErrorDetail) => {
          acc.push(detail.messages.join('; '));
          return acc;
        }, []);
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      });
  }
});
