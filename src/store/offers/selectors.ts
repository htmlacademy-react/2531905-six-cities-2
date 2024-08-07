import {StatusCodes} from 'http-status-codes';

import {NameSpace, RequestStatus} from '@/constants';
import {State} from '@/types/state';
import {Offer, OfferListItem, ReviewListItem} from '@/types';

export const getOffers = (state: Pick<State, NameSpace.Offer>): OfferListItem[] => state[NameSpace.Offer].offers;
export const getFavoriteOffers = (state: Pick<State, NameSpace.Offer>): OfferListItem[] => state[NameSpace.Offer].favorites;
export const getOffersListStatus = (state: Pick<State, NameSpace.Offer>): RequestStatus => state[NameSpace.Offer].offersListStatus;
export const getOfferStatus = (state: Pick<State, NameSpace.Offer>): RequestStatus => state[NameSpace.Offer].offerStatus;
export const getErrorCode = (state: Pick<State, NameSpace.Offer>): StatusCodes | null => state[NameSpace.Offer].errorCode;
export const getOffer = (state: Pick<State, NameSpace.Offer>): Offer | null => state[NameSpace.Offer].currentOffer;
export const getNearbyOffers = (state: Pick<State, NameSpace.Offer>): OfferListItem[] => state[NameSpace.Offer].nearbyOffers;
export const getReviews = (state: Pick<State, NameSpace.Offer>): ReviewListItem[] => state[NameSpace.Offer].reviews;
export const getReviewRequestStatus = (state: Pick<State, NameSpace.Offer>): RequestStatus => state[NameSpace.Offer].reviewRequestStatus;
