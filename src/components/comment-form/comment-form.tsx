import {ChangeEvent, FormEvent, Fragment, useState} from 'react';
import clsx from 'clsx';

import {RequestStatus, REVIEW_MAX_LENGTH, REVIEW_MIN_LENGTH} from '@/constants';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {useAppSelector} from '@/hooks/use-app-selector';
import {sendReview} from '@/store/offers/api-actions';
import {getReviewRequestStatus} from '@/store/offers/selectors';

import classes from './comment-form.module.css';

const stars = {
  1: 'terribly',
  2: 'badly',
  3: 'not bad',
  4: 'good',
  5: 'perfect',
};

type ChangeableFormElement = HTMLInputElement | HTMLTextAreaElement;

function CommentForm() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const requestStatus = useAppSelector(getReviewRequestStatus);
  const [state, setState] = useState({
    review: '',
    rating: '',
  });
  const offerId = params.id || '';

  const handleStateChange = (evt: ChangeEvent<ChangeableFormElement>): void => {
    const {name, value} = evt.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    const data = {
      formData: {
        rating: parseInt(state.rating, 10),
        comment: state.review,
      },
      offerId,
      onSuccess: () => {
        setState({
          review: '',
          rating: '',
        });
      }
    };

    dispatch(sendReview(data));
  };

  const isPending = requestStatus === RequestStatus.Pending;
  const isError = requestStatus === RequestStatus.Failed;
  const isBtnDisabled = isPending || state.review.length < REVIEW_MIN_LENGTH || state.review.length > REVIEW_MAX_LENGTH || state.rating.length === 0;

  return (
    <form className="reviews__form form" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          Object.entries(stars).reverse().map(([value, title]) => (
            <Fragment key={value}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={value}
                id={`${value}-stars`}
                type="radio"
                checked={state.rating === value}
                disabled={isPending}
                onChange={handleStateChange}
              />
              <label
                htmlFor={`${value}-stars`}
                className={clsx('reviews__rating-label form__rating-label', isPending && classes.disabledLabel)}
                title={title}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))
        }
      </div>
      <textarea
        value={state.review}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isPending}
        onChange={handleStateChange}
      >
      </textarea>
      {
        isError && (
          <div>
            <p className={classes.formErrorMessage}>
              Error occurred while posting review. Please try again later.
            </p>
          </div>
        )
      }
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">{REVIEW_MIN_LENGTH} characters</b> and
          at most <b className="reviews__text-amount">{REVIEW_MAX_LENGTH} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isBtnDisabled}>Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;
