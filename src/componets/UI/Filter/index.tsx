import { useEffect, useState } from 'react';
import classNames from 'classnames';

import './Filter.scss';

interface FilterProps {
  className: string;
  resultsTotal?: number;
  callback: React.Dispatch<React.SetStateAction<string>>;
}

export const Filter = ({ className, resultsTotal = 0, callback }: FilterProps) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => callback(value), 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [callback, value]);

  return (
    <div className={classNames('filter', className)}>
      <input
        className="filter__input"
        value={value}
        placeholder="What are you looking for?"
        onChange={(evt) => setValue(evt.target.value.toLowerCase())}
      />
      <span className="filter__result">{resultsTotal} tests</span>
    </div>
  );
};
