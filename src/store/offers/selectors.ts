import {NameSpace, RequestStatus} from '@/constants';
import {State} from '@/types/state';
import {City, OfferListItem} from '@/types';

export const getOffers = (state: State): OfferListItem[] => state[NameSpace.Offer].offers;
export const getOfferStatus = (state: State): RequestStatus => state[NameSpace.Offer].offerStatus;
export const getActiveSort = (state: State): string => state[NameSpace.Offer].activeSort;
export const getCurrentCity = (state: State): City => state[NameSpace.Offer].currentCity;
