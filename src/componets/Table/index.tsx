import classNames from 'classnames';

import { Sort, SortType, Status, Test } from '../../types';
import { AppRoute } from '../../constants';
import { NavButton } from '../UI/NavButton';

import './Table.scss';
import { Colors, TestStatusToModifierDict } from './constants';

const colors = Object.values(Colors);

interface RowProps {
  test: Test;
  className?: string;
}

export const Row = ({ className, test }: RowProps) => {
  const { id, name, site, status, type } = test;
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className={classNames('row', className, `row__${randomColor}`)}>
      <div className="row__cell row__name">{name}</div>
      <div className="row__cell row__type">{type}</div>
      <div className={`row__cell row__status row__status--${TestStatusToModifierDict[status]}`}>
        {status}
      </div>
      <div className="row__cell row__site">{site}</div>
      <div className="row__cell row__nav">
        {status === Status.DRAFT ? (
          <NavButton to={`${AppRoute.Finalize}/${id}`} isDark>
            Finilize
          </NavButton>
        ) : (
          <NavButton to={`${AppRoute.Results}/${id}`}>Results</NavButton>
        )}
      </div>
    </div>
  );
};

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
