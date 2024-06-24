import {ReviewListItem} from '@/types';
import {STARS_COUNT} from '@/constants';
import {formatDate} from '@/utils';

type ReviewItemProps = {
  review: ReviewListItem;
}

function ReviewItem({review: {
  comment,
  date,
  rating,
  user,
}}: ReviewItemProps) {
  const dateFormatted = formatDate(date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${100 / STARS_COUNT * rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={dateFormatted.dateTime}>
          {dateFormatted.month} {dateFormatted.year}
        </time>
      </div>
    </li>
  );
}

export default ReviewItem;
