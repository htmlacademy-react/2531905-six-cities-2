import {createAction} from '@reduxjs/toolkit';
import {City} from '@/types';

export const setCurrentCity = createAction<City>('offer/setCurrentCity');
