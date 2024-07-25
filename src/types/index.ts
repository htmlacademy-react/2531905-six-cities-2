export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  name: string;
  location: Location;
}

export type OfferListItem = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type ReviewListItem = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: User;
}

export type AuthData = {
  email: string;
  password: string;
}

export type UserData = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}

export type ErrorDetail = {
  property: string;
  value: string;
  messages: string[];
}

export type LoginError = {
  errorType: string;
  message: string;
  details: ErrorDetail[];
}
