import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import CommentForm from '@/components/comment-form/comment-form';
import Layout from '@/components/layout/layout';
import Card from '@/components/card/card';
import PremiumBadge from '@/components/premium-badge/premium-badge';
import ReviewsList from '@/components/reviews-list/reviews-list';
import Map from '@/components/map/map';
import Loader from '@/components/loader/loader';
import {StatusCodes} from 'http-status-codes';

import {AppRoute, MAX_NEARBY_COUNT, MAX_REVIEWS_COUNT, RequestStatus, STARS_COUNT} from '@/constants';
import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {useAppSelector} from '@/hooks/use-app-selector';
import {loadNearbyOffers, loadOffer, loadReviews} from '@/store/offers/api-actions';
import {getErrorCode, getFavoriteOffers, getNearbyOffers, getOffer, getOfferStatus, getReviews} from '@/store/offers/selectors';
import {clearNearbyOffers, clearOffer, clearReviews} from '@/store/offers/offers';
import {getIsUserAuthorized} from '@/store/user/selectors';
import {getRandomArrayValues} from '@/utils';
import {OfferListItem} from '@/types';
import CardBookmarkButton from '@/components/card-bookmark-button/card-bookmark-button.tsx';

function Offer(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const offer = useAppSelector(getOffer);
  const allNearbyOffers = useAppSelector(getNearbyOffers);
  const allReviews = useAppSelector(getReviews);
  const offerStatus = useAppSelector(getOfferStatus);
  const errorCode = useAppSelector(getErrorCode);
  const isUserAuthorized = useAppSelector(getIsUserAuthorized);
  const favorites = useAppSelector(getFavoriteOffers);

  const offerId = params.id || '';

  const reviews = allReviews.slice(0, MAX_REVIEWS_COUNT);
  const nearbyOffers = getRandomArrayValues<OfferListItem>(allNearbyOffers, MAX_NEARBY_COUNT);
  const points = nearbyOffers.map(({ location, id }) => ({ location, id}));
  const isFavorite = favorites.some((item) => item.id === offerId);

  useEffect(() => {
    if (!offer && errorCode === StatusCodes.NOT_FOUND) {
      navigate(AppRoute.NotFoundPage);
    }
  }, [navigate, offer, errorCode]);

  useEffect(() =>{
    window.scrollTo(0, 0);
    if (offerId) {
      dispatch(loadOffer(offerId));
      dispatch(loadNearbyOffers(offerId));
      dispatch(loadReviews(offerId));
    }
    return () => {
      dispatch(clearOffer());
      dispatch(clearNearbyOffers());
      dispatch(clearReviews());
    };
  }, [offerId, dispatch]);

  return (
    <div className="page">
      <Layout>
        <main className="page__main page__main--offer">
          {
            offerStatus === RequestStatus.Pending && <Loader message="Loading offer. Please wait..." />
          }
          {
            (offer && offerStatus === RequestStatus.Success) && (
              <section className="offer">
                <div className="offer__gallery-container container">
                  <div className="offer__gallery">
                    {
                      offer.images.map((image) => (
                        <div key={image} className="offer__image-wrapper">
                          <img className="offer__image" src={image} alt="Photo studio"/>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className="offer__container container">
                  <div className="offer__wrapper">
                    {offer.isPremium && <PremiumBadge />}
                    <div className="offer__name-wrapper">
                      <h1 className="offer__name">
                        {offer.title}
                      </h1>
                      <CardBookmarkButton isFavorite={isFavorite} offerId={offer.id} type="offer" />
                    </div>
                    <div className="offer__rating rating">
                      <div className="offer__stars rating__stars">
                        <span style={{width: `${100 / STARS_COUNT * offer.rating}%`}}></span>
                        <span className="visually-hidden">Rating</span>
                      </div>
                      <span className="offer__rating-value rating__value">
                        {offer.rating}
                      </span>
                    </div>
                    <ul className="offer__features">
                      <li className="offer__feature offer__feature--entire">
                        {offer.type}
                      </li>
                      <li className="offer__feature offer__feature--bedrooms">
                        {offer.bedrooms} {offer.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                      </li>
                      <li className="offer__feature offer__feature--adults">
                        Max {offer.maxAdults} {offer.maxAdults > 1 ? 'Adults' : 'Adult'}
                      </li>
                    </ul>
                    <div className="offer__price">
                      <b className="offer__price-value">&euro;{offer.price}</b>
                      <span className="offer__price-text">&nbsp;night</span>
                    </div>
                    {
                      offer.goods.length > 0 && (
                        <div className="offer__inside">
                          <h2 className="offer__inside-title">What&apos;s inside</h2>
                          <ul className="offer__inside-list">
                            {
                              offer.goods.map((good) => (
                                <li key={good} className="offer__inside-item">
                                  {good}
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      )
                    }
                    <div className="offer__host">
                      <h2 className="offer__host-title">Meet the host</h2>
                      <div className="offer__host-user user">
                        <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                          <img
                            className="offer__avatar user__avatar"
                            src={offer.host.avatarUrl}
                            width="74"
                            height="74"
                            alt={offer.host.name}
                          />
                        </div>
                        <span className="offer__user-name">
                          {offer.host.name}
                        </span>
                        {
                          offer.host.isPro && (
                            <span className="offer__user-status">
                              Pro
                            </span>
                          )
                        }
                      </div>
                      <div className="offer__description">
                        <p className="offer__text">
                          {offer.description}
                        </p>
                      </div>
                    </div>
                    <section className="offer__reviews reviews">
                      <h2 className="reviews__title">
                        Reviews
                        {reviews.length > 0 && (
                          <>
                            &middot; <span className="reviews__amount">{reviews.length}</span>
                          </>
                        )}
                      </h2>
                      <ReviewsList reviews={reviews} />
                      {isUserAuthorized && <CommentForm/>}
                    </section>
                  </div>
                </div>
                <div className="container">
                  <Map className="offer__map" points={points} city={offer.city}/>
                </div>
              </section>
            )
          }
          {
            nearbyOffers.length > 0 && (
              <div className="container">
                <section className="near-places places">
                  <h2 className="near-places__title">Other places in the neighbourhood</h2>
                  <div className="near-places__list places__list">
                    {
                      nearbyOffers.map((card) => (
                        <Card key={card.id} card={card} className="near-places"/>
                      ))
                    }
                  </div>
                </section>
              </div>
            )
          }
        </main>
      </Layout>
    </div>
  );
}

export default Offer;
