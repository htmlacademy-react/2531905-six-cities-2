import classes from './loader.module.css';

type LoaderProps = {
  message?: string;
}

function Loader({message = 'Loading ...'}: LoaderProps) {

  return (
    <div className={classes.wrapper}>
      <img src="img/loading.gif" alt="Loader"/>
      <span>{message}</span>
    </div>
  );
}

export default Loader;
