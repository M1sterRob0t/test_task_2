import classNames from 'classnames';
import './Title.scss';

interface TitleProps {
  children: string;
  className?: string;
}

export const Title = ({ children, className, ...props }: TitleProps) => (
  <h1 {...props} className={classNames('title', className)}>
    {children}
  </h1>
);
