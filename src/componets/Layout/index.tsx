import { Link, Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '../../constants';

import './Layout.scss';

export const Layout = () => {
  const location = useLocation();
  const isFooter = location.pathname !== AppRoute.Root;

  return (
    <div className="layout">
      <Outlet />
      {isFooter && (
        <footer className="layout__footer">
          <Link className="layout__link" to={AppRoute.Root}>
            Back
          </Link>
        </footer>
      )}
    </div>
  );
};
