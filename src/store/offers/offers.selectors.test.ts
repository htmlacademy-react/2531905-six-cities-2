import {NameSpace, RequestStatus} from '@/constants';
import {generateFullOffer, generateOffer, generateReview, initOfferState as initState} from '@/utils/mocks';
import {
  getErrorCode,
  getFavoriteOffers,
  getNearbyOffers,
  getOffer,
  getOffers,
  getOffersListStatus,
  getOfferStatus,
  getReviewRequestStatus,
  getReviews
} from '@/store/offers/selectors';

describe('', () => {
  it('should return offers from state', () => {
    const offers = [generateOffer()];
    const state = initState({
      offers
    });

    const result = getOffers({ [NameSpace.Offer]: state });

    expect(result).toEqual(offers);
  });

  it('should return favorite offers from state', () => {
    const favorites = [generateOffer()];
    const state = initState({
      favorites
    });

    const result = getFavoriteOffers({ [NameSpace.Offer]: state });

    expect(result).toEqual(favorites);
  });

  it('should return offersListStatus from state', () => {
    const offersListStatus = RequestStatus.Pending;
    const state = initState({
      offersListStatus,
    });

    const result = getOffersListStatus({ [NameSpace.Offer]: state });

    expect(result).toBe(offersListStatus);
  });

  it('should return offerStatus from state', () => {
    const offerStatus = RequestStatus.Success;
    const state = initState({
      offerStatus,
    });

    const result = getOfferStatus({ [NameSpace.Offer]: state });

    expect(result).toBe(offerStatus);
  });

  it('should return error code from state', () => {
    const errorCode = 500;
    const state = initState({
      errorCode,
    });

    const result = getErrorCode({ [NameSpace.Offer]: state });

    expect(result).toBe(errorCode);
  });

  it('should return current offer from state', () => {
    const currentOffer = generateFullOffer();
    const state = initState({
      currentOffer
    });

    const result = getOffer({ [NameSpace.Offer]: state });

    expect(result).toEqual(currentOffer);
  });

  it('should return nearby offers from state', () => {
    const nearbyOffers = [generateOffer(), generateOffer()];
    const state = initState({
      nearbyOffers
    });

    const result = getNearbyOffers({ [NameSpace.Offer]: state });

    expect(result).toEqual(nearbyOffers);
  });

  it('should return reviews from state', () => {
    const reviews = [generateReview(), generateReview()];
    const state = initState({
      reviews
    });

    const result = getReviews({ [NameSpace.Offer]: state });

    expect(result).toEqual(reviews);
  });

  it('should review request Status from state', () => {
    const reviewRequestStatus = RequestStatus.Idle;
    const state = initState();

    const result = getReviewRequestStatus({ [NameSpace.Offer]: state });

    expect(result).toBe(reviewRequestStatus);
  });
});
