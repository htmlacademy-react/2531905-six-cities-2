import classes from './loader.module.css';

function Loader() {
  return (
    <div className={classes.wrapper}>
      <img src="img/loading.gif" alt="Loader"/>
      <span>Loader offers ...</span>
    </div>
  );
}

export default Loader;
