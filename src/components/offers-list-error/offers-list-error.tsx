import classes from './offers-list-error.module.css';

type OffersListErrorProps = {
  error?: string;
}

function OffersListError({error}: OffersListErrorProps) {
  const defaultError = 'Error occurred. Please try again later.';

  return (
    <div className="cities">
      <div className="container">
        <div className={classes.error}>
          <img src="img/error.png" alt="error" className={classes.image}/>
          <h3>{error || defaultError}</h3>
        </div>
      </div>
    </div>
  );
}

export default OffersListError;
