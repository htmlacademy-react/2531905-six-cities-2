import {OfferListItem} from '@/types';

export enum AppRoute {
  MainPage = '/',
  LoginPage = '/login',
  FavoritesPage = '/favorites',
  OfferPage = '/offer/:id',
  NotFoundPage = '*',
}

export enum ApiUrl {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const sortOptions = {
  Popular: 'Popular',
  PriceAsc: 'Price: low to high',
  PriceDesc: 'Price: high to low',
  RatingDesc: 'Top rated first',
};

export const STARS_COUNT = 5;

export const REVIEW_MIN_LENGTH = 50;
export const REVIEW_MAX_LENGTH = 300;

export const URL_MARKER_DEFAULT = '/img/pin.svg';

export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export const CITIES = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  }
];

export const SORT_OPTIONS = {
  [sortOptions.Popular]: () => 0,
  [sortOptions.PriceAsc]: (a: OfferListItem, b: OfferListItem) => (a.price - b.price),
  [sortOptions.PriceDesc]: (a: OfferListItem, b: OfferListItem) => (b.price - a.price),
  [sortOptions.RatingDesc]: (a: OfferListItem, b: OfferListItem) => (b.rating - a.rating),
};

export enum RequestStatus {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export enum NameSpace {
  Offer = 'OFFER',
  User = 'USER',
}
