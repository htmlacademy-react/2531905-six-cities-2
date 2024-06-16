type PremiumBadgeProps = {
  small?: boolean;
}

function PremiumBadge({small}: PremiumBadgeProps) {
  return (
    small ? (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    ) : (
      <div className="offer__mark">
        <span>Premium</span>
      </div>
    )
  );
}

export default PremiumBadge;
