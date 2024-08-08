import {lorem, datatype} from 'faker';
import {RequestStatus} from '@/constants';
import {clearFavorites, clearNearbyOffers, clearOffer, clearReviews, offersSlice} from '@/store/offers/offers';
import {getFavorites, loadNearbyOffers, loadOffer, loadOffers, loadReviews, sendReview, toggleFavorite} from '@/store/offers/api-actions';
import {generateFullOffer, generateOffer, generateReview, initOfferState as initState} from '@/utils/mocks';

describe('Offers slice', () => {
  it('should return initial state with unknown action', () => {
    const emptyAction = { type : 'unknown' };
    const expectedState = initState();

    const result = offersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default state with empty action', () => {
    const emptyAction = { type : '' };
    const expectedState = initState();

    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should clear current offer with "clearOffer" action', () => {
    const initialState = initState({
      currentOffer: {title: 'test offer'},
      offerStatus: RequestStatus.Success,
    });
    const expectedState = initState();

    const result = offersSlice.reducer(initialState, clearOffer);

    expect(result).toEqual(expectedState);
  });

  it('should clear nearby offers with "clearNearbyOffers" action', () => {
    const initialState = initState({
      nearbyOffers: [{title: 'test offer'}],
    });
    const expectedState = initState();

    const result = offersSlice.reducer(initialState, clearNearbyOffers);

    expect(result).toEqual(expectedState);
  });

  it('should clear nearby offers with "clearReviews" action', () => {
    const initialState = initState({
      reviews: [{comment: 'test review'}],
    });
    const expectedState = initState();

    const result = offersSlice.reducer(initialState, clearReviews);

    expect(result).toEqual(expectedState);
  });

  it('should clear nearby offers with "clearFavorites" action', () => {
    const initialState = initState({
      favorites: [{title: 'test offer'}],
    });
    const expectedState = initState();

    const result = offersSlice.reducer(initialState, clearFavorites);

    expect(result).toEqual(expectedState);
  });

  it('should set "PENDING" to offersListStatus with "loadOffers.pending" action', () => {
    const initialState = initState();
    const expectedState = {...initialState, offersListStatus: RequestStatus.Pending};

    const result = offersSlice.reducer(initialState, loadOffers.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "SUCCESS" to offersListStatus and offers with "loadOffers.fulfilled" action', () => {
    const offers = [generateOffer()];
    const initialState = initState();
    const expectedState = {...initialState, offersListStatus: RequestStatus.Success, offers};

    const result = offersSlice.reducer(initialState, loadOffers.fulfilled(offers, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "FAILED" to offersListStatus with "loadOffers.rejected" action', () => {
    const initialState = initState();
    const expectedState = {...initialState, offersListStatus: RequestStatus.Failed};

    const result = offersSlice.reducer(initialState, loadOffers.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "PENDING" to offerStatus with "loadOffer.pending" action', () => {
    const initialState = initState();
    const expectedState = {...initialState, offerStatus: RequestStatus.Pending};

    const result = offersSlice.reducer(initialState, loadOffer.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "SUCCESS" to offerStatus and currentOffer with "loadOffer.fulfilled" action', () => {
    const offer = generateFullOffer();
    const offerId = datatype.uuid();
    const initialState = initState();
    const expectedState = {...initialState, offerStatus: RequestStatus.Success, currentOffer: offer};

    const result = offersSlice.reducer(initialState, loadOffer.fulfilled(offer, '', offerId));

    expect(result).toEqual(expectedState);
  });

  it('should set "FAILED" to offerStatus and clear currentOffer with "loadOffer.rejected" action', () => {
    const offerId = datatype.uuid();
    const initialState = initState();
    const expectedState = {...initialState, offerStatus: RequestStatus.Failed, currentOffer: null};

    const result = offersSlice.reducer(initialState, loadOffer.rejected(null, '', offerId));

    expect(result).toEqual(expectedState);
  });

  it('should set nearbyOffers with "loadNearbyOffers.fulfilled" action', () => {
    const nearbyOffers = [generateOffer()];
    const offerId = datatype.uuid();
    const initialState = initState();
    const expectedState = {...initialState, nearbyOffers};

    const result = offersSlice.reducer(initialState, loadNearbyOffers.fulfilled(nearbyOffers, '', offerId));

    expect(result).toEqual(expectedState);
  });

  it('should clear nearbyOffers with "loadNearbyOffers.rejected" action', () => {
    const initialState = initState();
    const expectedState = {...initialState, nearbyOffers: []};

    const result = offersSlice.reducer(initialState, loadNearbyOffers.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set reviews with "loadReviews.fulfilled" action', () => {
    const reviews = [generateReview()];
    const offerId = datatype.uuid();
    const initialState = initState();
    const expectedState = {...initialState, reviews};

    const result = offersSlice.reducer(initialState, loadReviews.fulfilled(reviews, '', offerId));

    expect(result).toEqual(expectedState);
  });

  it('should clear reviews with "loadReviews.rejected" action', () => {
    const initialState = initState();
    const expectedState = {...initialState, reviews: []};

    const result = offersSlice.reducer(initialState, loadReviews.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "PENDING" to reviewRequestStatus with "sendReview.pending" action', () => {
    const initialState = initState();
    const expectedState = {...initialState, reviewRequestStatus: RequestStatus.Pending};

    const result = offersSlice.reducer(initialState, sendReview.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "SUCCESS" to reviewRequestStatus and unshift review with "sendReview.pending" action', () => {
    const reviewInitial = generateReview();
    const reviewResponse = generateReview();
    const reviewPayload = {
      formData: {
        comment: lorem.words(10),
        rating: datatype.number(5),
      },
      offerId: datatype.uuid(),
    };
    const initialState = initState({
      reviews: [reviewInitial],
    });
    const expectedState = {...initialState, reviewRequestStatus: RequestStatus.Success, reviews: [reviewResponse, reviewInitial] };

    const result = offersSlice.reducer(initialState, sendReview.fulfilled(reviewResponse, '', reviewPayload));

    expect(result).toEqual(expectedState);
    expect(result.reviews.length).toBe(2);
    expect(result.reviews[0].id).toBe(reviewResponse.id);
  });

  it('should set "FAILED" to reviewRequestStatus with "sendReview.rejected" action', () => {
    const initialState = initState();
    const expectedState = {...initialState, reviewRequestStatus: RequestStatus.Failed};

    const result = offersSlice.reducer(initialState, sendReview.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set favorites with "getFavorites.fulfilled" action', () => {
    const favorites = [generateOffer()];
    const initialState = initState();
    const expectedState = {...initialState, favorites};

    const result = offersSlice.reducer(initialState, getFavorites.fulfilled(favorites, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should clear favorites with "getFavorites.rejected" action', () => {
    const initialState = initState();
    const expectedState = {...initialState, favorites: []};

    const result = offersSlice.reducer(initialState, getFavorites.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should add new Offer to favorites when isFavorite is true with "toggleFavorite.fulfilled" action', () => {
    const favorites = [generateOffer()];
    const newFavorite = generateOffer();
    const toggleFavoritePayload = {
      offerId: newFavorite.id,
      status: 1
    };
    newFavorite.isFavorite = true;
    const initialState = initState({
      favorites
    });
    const expectedState = {...initialState, favorites: [...favorites, newFavorite]};

    const result = offersSlice.reducer(initialState, toggleFavorite.fulfilled(newFavorite, '', toggleFavoritePayload));

    expect(result).toEqual(expectedState);
  });

  it('should remove offer from favorites when isFavorite is false with "toggleFavorite.fulfilled" action', () => {
    const newFavorite = generateOffer();
    const toggleFavoritePayload = {
      offerId: newFavorite.id,
      status: 0,
    };
    const initialState = initState({
      favorites: [newFavorite]
    });
    newFavorite.isFavorite = false;
    const expectedState = {...initialState, favorites: []};

    const result = offersSlice.reducer(initialState, toggleFavorite.fulfilled(newFavorite, '', toggleFavoritePayload));

    expect(result).toEqual(expectedState);
  });
});
