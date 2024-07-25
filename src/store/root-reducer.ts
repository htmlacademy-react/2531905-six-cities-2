import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '@/constants';
import {offersSlice} from '@/store/offers/offers';
import {usersSlice} from '@/store/user/user';
import {appSlice} from '@/store/app/app';

export const rootReducer = combineReducers({
  [NameSpace.Offer]: offersSlice.reducer,
  [NameSpace.User]: usersSlice.reducer,
  [NameSpace.App]: appSlice.reducer,
});
