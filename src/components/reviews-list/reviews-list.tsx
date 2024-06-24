import ReviewItem from '@/components/review-item/review-item';

import {ReviewListItem} from '@/types';

type ReviewsListProps = {
  reviews: ReviewListItem[];
}

function ReviewsList({reviews}: ReviewsListProps) {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
}

export default ReviewsList;
