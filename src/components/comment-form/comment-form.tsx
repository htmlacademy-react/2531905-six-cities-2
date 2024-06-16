import {ChangeEvent, Fragment, useState} from 'react';
import {REVIEW_MAX_LENGTH, REVIEW_MIN_LENGTH} from '@/constants';

const stars = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly',
};

type ChangeableFormElement = HTMLInputElement | HTMLTextAreaElement;

function CommentForm() {
  const [state, setState] = useState({
    review: '',
    rating: ''
  });

  const handleStateChange = (evt: ChangeEvent<ChangeableFormElement>): void => {
    const {name, value} = evt.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const isBtnDisabled = state.review.length < REVIEW_MIN_LENGTH || state.review.length > REVIEW_MAX_LENGTH || state.rating.length === 0;

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          Object.entries(stars).map(([value, title]) => (
            <Fragment key={value}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={value}
                id={`${value}-stars`}
                type="radio"
                onChange={handleStateChange}
                checked={state.rating === value}
              />
              <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
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
        onChange={handleStateChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
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
