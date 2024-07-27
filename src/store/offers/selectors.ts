import {NameSpace, RequestStatus} from '@/constants';
import {State} from '@/types/state';
import {Offer, OfferListItem, ReviewListItem} from '@/types';

export const getOffers = (state: State): OfferListItem[] => state[NameSpace.Offer].offers;
export const getOffersListStatus = (state: State): RequestStatus => state[NameSpace.Offer].offersListStatus;
export const getOfferStatus = (state: State): RequestStatus => state[NameSpace.Offer].offerStatus;
export const getOffer = (state: State): Offer | null => state[NameSpace.Offer].currentOffer;
export const getNearbyOffers = (state: State): OfferListItem[] => state[NameSpace.Offer].nearbyOffers;
export const getReviews = (state: State): ReviewListItem[] => state[NameSpace.Offer].reviews;
export const getReviewRequestStatus = (state: State): RequestStatus => state[NameSpace.Offer].reviewRequestStatus;
