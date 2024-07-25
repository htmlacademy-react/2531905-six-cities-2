import {NameSpace, RequestStatus} from '@/constants';
import {State} from '@/types/state';
import {OfferListItem} from '@/types';

export const getOffers = (state: State): OfferListItem[] => state[NameSpace.Offer].offers;
export const getOfferStatus = (state: State): RequestStatus => state[NameSpace.Offer].offerStatus;
