import classNames from 'classnames';

import { Status, Test } from '../../../../types';
import { AppRoute } from '../../../../constants';
import { NavButton } from '../../../UI/NavButton';
import { Colors, TestStatusToModifierDict } from '../../constants';

import './Row.scss';

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
