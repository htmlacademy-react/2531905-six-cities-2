import clsx from 'clsx';

type CardBookmarkButtonProps = {
  isFavorite: boolean;
}

function CardBookmarkButton({isFavorite}: CardBookmarkButtonProps) {
  const bookmarkClass = clsx('place-card__bookmark-button button', isFavorite && 'place-card__bookmark-button--active');

  return (
    <button className={bookmarkClass} type="button">
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default CardBookmarkButton;
