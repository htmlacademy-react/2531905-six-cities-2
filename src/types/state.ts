import {store} from '@/store';
import {AuthorizationStatus, RequestStatus} from '@/constants';
import {City, OfferListItem} from '@/types';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type OfferState = {
  offers: OfferListItem[];
  currentCity: City;
  activeSort: string;
  offerStatus: RequestStatus;
}

export type UsersState = {
  authorizationStatus: AuthorizationStatus;
}
