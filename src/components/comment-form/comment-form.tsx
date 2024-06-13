import {ChangeEvent, useState} from 'react';

function CommentForm() {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  const stars = {
    5: 'perfect',
    4: 'good',
    3: 'not bad',
    2: 'badly',
    1: 'terribly',
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
    setComment(evt.target.value);
  };

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setRating(evt.target.value);
  };

  const isBtnDisabled = comment.length === 0 || rating.length === 0;

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          Object.entries(stars).map(([value, title]) => (
            <>
              <input className="form__rating-input visually-hidden" name="rating" value={value} id={`${value}-stars`} type="radio" onChange={handleRatingChange} checked={rating === value} />
              <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </>
          ))
        }
      </div>
      <textarea value={comment} onChange={handleCommentChange} className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isBtnDisabled}>Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;
