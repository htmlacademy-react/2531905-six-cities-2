import clsx from 'clsx';
import {useState} from 'react';

type OffersListItemProps = {
  options: string[];
  activeSort: number;
  onSortChange: (index: number) => void;
}

function OffersListSort({options, activeSort, onSortChange}: OffersListItemProps) {
  const [sortOpened, setSortOpened] = useState(false);
  const pageClass = clsx('places__options places__options--custom', sortOpened && 'places__options--opened');

  const toggleSort = () => {
    setSortOpened((prevValue) => !prevValue);
  };

  const handleSortChange = (index: number) => {
    onSortChange(index);
    setSortOpened(false);
  };

  const currentTitle = options[activeSort];

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={toggleSort}>
        {currentTitle}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={pageClass}>
        {
          options.map((option, index) => {
            const optionsClass = clsx('places__option', index === activeSort && 'places__option--active');
            return <li key={option} className={optionsClass} tabIndex={0} onClick={() => handleSortChange(index)}>{option}</li>
          })
        }
      </ul>
    </form>
  );
}

export default OffersListSort;
