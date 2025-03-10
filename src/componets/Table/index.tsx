import classNames from 'classnames';

import { Sort, SortType, Test } from '../../types';

import './Table.scss';
import { Row } from './components/Row';

interface TableProps {
  tests: Test[];
  setSort: React.Dispatch<React.SetStateAction<Sort | null>>;
  sort: Sort | null;
}

export const Table = ({ tests, setSort, sort }: TableProps) => {
  const onSortChange = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const sortValue = evt.currentTarget.dataset.sortValue;

    if (sortValue) {
      setSort((prev) => ({
        type: prev?.type === SortType.ASC ? SortType.DSC : SortType.ASC,
        value: sortValue as Sort['value'],
      }));
    }
  };

  return (
    <div className="table">
      <div className="table__header">
        <div className="table__column">
          <button
            className={classNames(
              'table__button',
              sort && sort.value === 'name'
                ? sort.type === SortType.ASC
                  ? 'table__button--active'
                  : 'table__button--active table__button--active-desc'
                : ''
            )}
            onClick={onSortChange}
            data-sort-value="name"
          >
            Name
          </button>
        </div>
        <div className="table__column">
          <button
            className={classNames(
              'table__button',
              sort && sort.value === 'type'
                ? sort.type === SortType.ASC
                  ? 'table__button--active'
                  : 'table__button--active table__button--active-desc'
                : ''
            )}
            onClick={onSortChange}
            data-sort-value="type"
          >
            Type
          </button>
        </div>
        <div className="table__column">
          <button
            className={classNames(
              'table__button',
              sort && sort.value === 'status'
                ? sort.type === SortType.ASC
                  ? 'table__button--active'
                  : 'table__button--active table__button--active-desc'
                : ''
            )}
            onClick={onSortChange}
            data-sort-value="status"
          >
            Status
          </button>
        </div>
        <div className="table__column">
          <button
            className={classNames(
              'table__button',
              sort && sort.value === 'site'
                ? sort.type === SortType.ASC
                  ? 'table__button--active'
                  : 'table__button--active table__button--active-desc'
                : ''
            )}
            onClick={onSortChange}
            data-sort-value="site"
          >
            Site
          </button>
        </div>
        <div className="table__column"></div>
      </div>
      <div className="table__rows">
        {tests.map((test) => (
          <Row className="table__row" key={test.id} test={test} />
        ))}
      </div>
    </div>
  );
};
