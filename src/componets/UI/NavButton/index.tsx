import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './NavButton.scss';

interface NavButton {
  to: string;
  isDark?: boolean;
  className?: string;
  children: string;
}
export const NavButton = ({ to, className, isDark = false, children }: NavButton) => {
  return (
    <Link to={to} className={classNames('nav-button', isDark && 'nav-button--dark', className)}>
      {children}
    </Link>
  );
};
