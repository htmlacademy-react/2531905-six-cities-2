import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '@/constants';
import {offersSlice} from '@/store/offers/offers';
import {usersSlice} from '@/store/user/user';

export const rootReducer = combineReducers({
  [NameSpace.Offer]: offersSlice.reducer,
  [NameSpace.User]: usersSlice.reducer,
});
