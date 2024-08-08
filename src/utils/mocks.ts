import {address, datatype, finance, image, internet, lorem, name} from 'faker';
import {AuthorizationStatus, CITIES, RequestStatus, sortOptions} from '@/constants';

export const generateOffer = () => ({
  id: lorem.word(),
  title: lorem.word(),
  type: lorem.word(),
  price: parseInt(finance.amount(1, 1000), 10),
  previewImage: image.imageUrl(),
  city: {
    name: address.cityName(),
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: 13,
    }
  },
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: 13,
  },
  isFavorite: false,
  isPremium: true,
  rating: datatype.number(5),
});

export const generateFullOffer = () => ({
  ...generateOffer(),
  description: lorem.words(10),
  bedrooms: datatype.number(5),
  goods: [lorem.word(), lorem.word()],
  host: {
    name: name.title(),
    avatarUrl: image.imageUrl(),
    isPro: false,
  },
  images: [image.imageUrl(), image.imageUrl(), image.imageUrl()],
  maxAdults: datatype.number(10),
});

export const generateReview = () => ({
  id: datatype.uuid(),
  comment: lorem.words(10),
  date: datatype.datetime().toString(),
  rating: datatype.number(5),
  user: {
    name: name.title(),
    avatarUrl: image.imageUrl(),
    isPro: true,
  },
});

export const initOfferState = (data = {}) => ({
  offers: [],
  favorites: [],
  offersListStatus: RequestStatus.Idle,
  offerStatus: RequestStatus.Idle,
  errorCode: null,
  currentOffer: null,
  nearbyOffers: [],
  reviews: [],
  reviewRequestStatus: RequestStatus.Idle,
  ...data,
});

export const initAppState = () => ({
  currentCity: CITIES[0],
  activeSort: sortOptions.Popular,
});

export const generateUser = () => ({
  name: name.title(),
  avatarUrl: internet.url(),
  isPro: true,
  email: internet.email(),
  token: internet.mac(),
});

export const initUserState = () => ({
  authorizationStatus: AuthorizationStatus.Unknown,
  requestStatus: RequestStatus.Idle,
  loginResponseErrors: [],
  user: null,
});
