import clsx from 'clsx';
import {useCallback} from 'react';

import {toggleFavorite} from '@/store/offers/api-actions';
import {getIsUserAuthorized} from '@/store/user/selectors';
import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {useAppSelector} from '@/hooks/use-app-selector';

type CardBookmarkButtonProps = {
  isFavorite: boolean;
  offerId: string;
  type: 'place-card' | 'offer';
}

const sizes = {
  'place-card': {
    width: 18,
    height: 19,
  },
  offer: {
    width: 31,
    height: 33,
  }
};

function CardBookmarkButton({isFavorite, type, offerId}: CardBookmarkButtonProps) {
  const isUserAuthorized = useAppSelector(getIsUserAuthorized);
  const dispatch = useAppDispatch();
  const bookmarkClass = clsx(`${type}__bookmark-button button`, isFavorite && `${type}__bookmark-button--active`);
  const {width, height} = sizes[type];

  const handleBookmarkClick = useCallback(() => {
    if (isUserAuthorized) {
      const status = Number(!isFavorite);
      dispatch(toggleFavorite({offerId, status}));
    }
  }, [dispatch, isFavorite, offerId, isUserAuthorized]);

  return (
    <button onClick={handleBookmarkClick} className={bookmarkClass} type="button">
      <svg className={`${type}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default CardBookmarkButton;
