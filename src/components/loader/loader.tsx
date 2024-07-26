import classes from './loader.module.css';

type LoaderProps = {
  message?: string;
}

function Loader({message}: LoaderProps) {
  const content = message || 'Loader offers ...';

  return (
    <div className={classes.wrapper}>
      <img src="img/loading.gif" alt="Loader"/>
      <span>{content}</span>
    </div>
  );
}

export default Loader;
