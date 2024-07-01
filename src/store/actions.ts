import {createAction} from '@reduxjs/toolkit';
import {City, OfferListItem} from '@/types';

export const setCurrentCity = createAction<City>('offer/setCurrentCity');
export const setOffers = createAction<OfferListItem[]>('offer/setList');
