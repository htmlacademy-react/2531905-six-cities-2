import classes from './loading.module.css';

function Loading() {
  return (
    <div className={classes.wrapper}>
      <img src="img/loading.gif" alt="Loading"/>
      <span>Loading offers ...</span>
    </div>
  );
}

export default Loading;
