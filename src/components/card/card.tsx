import {generatePath, Link} from 'react-router-dom';

import {AppRoute, STARS_COUNT} from '@/constants';
import {OfferListItem} from '@/types';
import CardBookmarkButton from '@/components/card-bookmark-button/card-bookmark-button';
import PremiumBadge from '@/components/premium-badge/premium-badge';

type CardProps = {
  card: OfferListItem;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
  className: 'favorites' | 'cities' | 'near-places';
}

const sizes = {
  cities: {
    width: 260,
    height: 200,
  },
  favorites: {
    width: 150,
    height: 110,
  },
  'near-places': {
    width: 260,
    height: 200,
  }
};

function Card({
  card: {
    id,
    price,
    rating,
    type,
    title,
    previewImage,
    isFavorite,
    isPremium,
  },
  onMouseEnter,
  onMouseLeave,
  className,
}: CardProps): JSX.Element {
  const {width, height} = sizes[className];
  const offerUrl = generatePath(AppRoute.OfferPage, {
    id: id,
  });

  return (
    <article
      onMouseEnter={() => onMouseEnter ? onMouseEnter(id) : undefined}
      onMouseLeave={() => onMouseLeave ? onMouseLeave() : undefined}
      className={`${className}__card place-card`}
    >
      {isPremium && <PremiumBadge small/>}
      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <Link to={offerUrl}>
          <img className="place-card__image" src={previewImage} width={width} height={height} alt="Place image"/>
        </Link>
      </div>
      <div className={`${className}__card-info place-card__info"`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <CardBookmarkButton isFavorite={isFavorite}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${100 / STARS_COUNT * rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerUrl}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;
