import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {NameSpace, CITIES, sortOptions} from '@/constants';

import {City} from '@/types';

type AppState = {
  currentCity: City;
  activeSort: string;
}

const initialState: AppState = {
  currentCity: CITIES[0],
  activeSort: sortOptions.Popular,
};

export const appSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCurrentCity: (state, action: PayloadAction<City>) => {
      state.currentCity = action.payload;
    },
    setActiveSort: (state, action: PayloadAction<string>) => {
      state.activeSort = action.payload;
    }
  },
});

export const {setCurrentCity, setActiveSort} = appSlice.actions;
