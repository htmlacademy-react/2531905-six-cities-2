import {createAction} from '@reduxjs/toolkit';
import {City, OfferListItem} from '@/types';

export const setCurrentCity = createAction<City>('offer/setCurrentCity');
export const setActiveSort = createAction<string>('offer/setActiveSort');
export const setOffers = createAction<OfferListItem[]>('offer/setOffers');
export const setIsOffersLoading = createAction<boolean>('offer/setIsLoading');
