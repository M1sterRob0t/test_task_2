import { AppRoute } from '../../../constants';
import { NavButton } from '../NavButton';

import './NoResults.scss';

export const NoResults = () => {
  return (
    <section className="no-results">
      <p className="no-results__desc">Your search did not match any results.</p>
      <NavButton className="no-results__button" to={AppRoute.Root}>
        Reset
      </NavButton>
    </section>
  );
};
